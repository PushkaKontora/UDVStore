from typing import Iterable, Optional

from django.db.models import QuerySet

from api.internal.models.store import Transaction, TransactionTypes
from api.internal.user.db.models import Order
from api.internal.user.domain.interfaces import ITransactionRepository


class TransactionRepository(ITransactionRepository):
    def declare(
        self,
        source_id: int,
        destination_id: int,
        typeof: TransactionTypes,
        accrual: int,
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
        accrual: int,
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
