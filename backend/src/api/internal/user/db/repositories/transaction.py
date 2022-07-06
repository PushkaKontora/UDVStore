from typing import Iterable, List, Optional

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.db.models import F, Q, QuerySet
from django.db.transaction import atomic
from django.utils import timezone
from django.utils.datastructures import MultiValueDict

from api.internal.user.db.models import Order, StatusChoices, Transaction, TransactionFile, TransactionTypes
from api.internal.user.domain.interfaces import ITransactionRepository


class TransactionRepository(ITransactionRepository):
    def declare(
        self,
        source_id: int,
        destination_id: Optional[int],
        typeof: TransactionTypes,
        accrual: int = 0,
        description: Optional[str] = None,
        order: Optional[Order] = None,
    ) -> Transaction:
        return Transaction.objects.create(
            source_id=source_id,
            destination_id=destination_id,
            type=typeof,
            accrual=accrual,
            description=description,
            order=order,
        )

    def many_declare(
        self,
        source_id: int,
        destination_ids: Iterable[int],
        typeof: TransactionTypes,
        accrual: int = 0,
        description: Optional[str] = None,
        order: Optional[Order] = None,
    ) -> QuerySet[Transaction]:
        return Transaction.objects.bulk_create(
            Transaction(
                source_id=source_id,
                destination_id=destination_id,
                type=typeof,
                accrual=accrual,
                description=description,
                order=order,
            )
            for destination_id in destination_ids
        )

    def get_history(self, user_id: int) -> QuerySet[Transaction]:
        return Transaction.objects.filter(
            (Q(source_id=user_id) | Q(destination_id=user_id)) & ~Q(type=TransactionTypes.REQUEST)
        ).order_by("-created_at")

    def attach_files(self, activity: Transaction, files: Iterable[InMemoryUploadedFile]) -> None:
        if activity.type != TransactionTypes.REQUEST:
            raise ValueError("Wrong transaction type")

        TransactionFile.objects.bulk_create(TransactionFile(transaction=activity, filename=file) for file in files)

    def get_orders_details_by_user(self, user_id: int) -> QuerySet[Transaction]:
        return Transaction.objects.filter(~Q(order=None) & Q(source_id=user_id)).order_by(
            "order__status", "-created_at"
        )

    def get_orders_details(self) -> QuerySet[Transaction]:
        now = timezone.now()
        return (
            Transaction.objects.filter(~Q(order=None))
            .annotate(
                delta=models.Case(
                    models.When(order__status=StatusChoices.IN_PROCESS, then=F("created_at") - now),
                    models.When(order__status=StatusChoices.DONE, then=now - F("created_at")),
                    output_field=models.DurationField(),
                )
            )
            .order_by("order__status", "delta")
        )
