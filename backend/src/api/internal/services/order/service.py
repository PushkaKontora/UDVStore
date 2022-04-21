from typing import Optional

from django.db.models import QuerySet

from api.internal.models.store import Order, StatusChoices


def get_formed_orders() -> QuerySet[Order]:
    return Order.objects.filter(in_cart=False).order_by("status")


def get_user_formed_orders(profile_id: int) -> QuerySet[Order]:
    formed_orders = get_formed_orders()

    return formed_orders.filter(profile=profile_id)


def get_formed_order_by_transaction(transaction_id: int) -> Order:
    return Order.objects.filter(transaction=transaction_id).first()


def change_status_order_to(order: Order, status_id: int) -> Optional[Order]:
    if status_id not in StatusChoices or status_id == StatusChoices.NEW and not order.in_cart:
        return None

    order.status = status_id
    order.save()

    return order
