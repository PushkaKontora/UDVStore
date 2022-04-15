from typing import Union, Optional

from django.contrib.auth.models import User
from django.db.models import QuerySet

from api.internal.models.profile import Profile
from api.internal.models.store import StorageCell, Order
from api.internal.services.user import get_profile_by_user


def get_order(pk: Union[int, str], profile: Profile) -> Order:
    return Order.objects.filter(pk=pk, profile=profile).first()


def get_storage_cell_by_id(storage_id: Union[int, str]) -> Optional[StorageCell]:
    return StorageCell.objects.filter(id=storage_id).first()


def get_orders_by_user(user: User) -> QuerySet[Order]:
    profile = get_profile_by_user(user)
    return get_orders_by_profile(profile)


def get_orders_by_profile(profile: Profile) -> QuerySet[Order]:
    return Order.objects.filter(profile=profile, in_cart=True)


def validate_amount(order: Order) -> bool:
    return order.amount <= order.storage_cell.amount


def validate_new_order(order: Order) -> bool:
    cart = get_orders_by_profile(order.profile)

    if cart.filter(storage_cell=order.storage_cell).first():
        return False

    return validate_amount(order)
