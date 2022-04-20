from django.db.models import QuerySet

from api.internal.models.store import Order


def get_formed_orders() -> QuerySet[Order]:
    return Order.objects.filter(in_cart=False).order_by("status")


def get_user_formed_orders(profile_id: int) -> QuerySet[Order]:
    formed_orders = get_formed_orders()

    return formed_orders.filter(profile=profile_id)
