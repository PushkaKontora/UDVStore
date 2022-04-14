from typing import Union, Optional

from django.db.models import QuerySet

from api.internal.models.profile import Profile
from api.internal.models.store import StorageCell, Order


def get_storage_cell_by_id(storage_id: Union[int, str]) -> Optional[StorageCell]:
    return StorageCell.objects.filter(id=storage_id).first()


def get_orders_in_cart(profile: Profile) -> QuerySet[Order]:
    return Order.objects.filter(profile=profile, in_cart=True)


def validate_new_order(order: Order, profile: Profile) -> bool:
    cart = get_orders_in_cart(profile)

    if cart.filter(storage_cell=order.storage_cell).first():
        return False

    return order.amount <= order.storage_cell.amount
