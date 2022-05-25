from typing import Optional

from django.db import models
from django.db.models import F, Q, QuerySet
from django.utils import timezone

from api.internal.models.store import Order, StatusChoices, Transaction


def get_formed_orders() -> QuerySet[Transaction]:
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


def get_formed_orders_by_user(profile_id: int) -> QuerySet[Transaction]:
    return Transaction.objects.filter(~Q(order=None) & Q(source=profile_id)).order_by("order__status", "-created_at")


def get_formed_order_by_transaction(transaction_id: int) -> Order:
    return Order.objects.filter(transaction=transaction_id).first()


def change_status_order_to(order: Order, status_id: int) -> Optional[Order]:
    if status_id not in StatusChoices or status_id == StatusChoices.NEW and not order.in_cart:
        return None

    order.status = status_id
    order.save()

    return order
