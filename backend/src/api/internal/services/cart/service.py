from typing import Union, Optional

from django.db.models import QuerySet
from rest_framework.request import Request

from api.internal.cart.serializers import CartSerializer
from api.internal.models.profile import Profile
from api.internal.models.store import StorageCell, Order


def get_order(pk: Union[int, str]) -> Order:
    return Order.objects.filter(pk=pk).first()


def get_storage_cell_by_id(storage_id: Union[int, str]) -> Optional[StorageCell]:
    return StorageCell.objects.filter(id=storage_id).first()


def get_orders_in_cart(profile: Profile) -> QuerySet[Order]:
    return Order.objects.filter(profile=profile, in_cart=True)


def validate_amount(order: Order) -> bool:
    return order.amount <= order.storage_cell.amount


def validate_new_order(order: Order) -> bool:
    cart = get_orders_in_cart(order.profile)

    if cart.filter(storage_cell=order.storage_cell).first():
        return False

    return validate_amount(order)
