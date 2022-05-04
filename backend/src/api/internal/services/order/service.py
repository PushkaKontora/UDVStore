from typing import Optional

from django.db.models import QuerySet, Q

from api.internal.models.store import Order, StatusChoices, Transaction


def get_formed_orders() -> QuerySet[Transaction]:
    return Transaction.objects.filter(~Q(order=None)).order_by("order__status")


def get_formed_orders_by_user(profile_id: int) -> QuerySet[Transaction]:
    formed_orders = get_formed_orders()

    return formed_orders.filter(source=profile_id)


def get_formed_order_by_transaction(transaction_id: int) -> Order:
    return Order.objects.filter(transaction=transaction_id).first()


def change_status_order_to(order: Order, status_id: int) -> Optional[Order]:
    if status_id not in StatusChoices or status_id == StatusChoices.NEW and not order.in_cart:
        return None

    order.status = status_id
    order.save()

    return order
