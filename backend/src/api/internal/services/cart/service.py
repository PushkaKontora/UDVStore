from typing import Union, Optional

from django.contrib.auth.models import User
from django.db import IntegrityError, transaction
from django.db.models import QuerySet

from api.internal.models.profile import Profile
from api.internal.models.store import StorageCell, Order, Transaction, StatusChoices, TransactionTypes
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


def get_total(order: Order) -> int:
    return order.storage_cell.product.price * order.amount


def validate_amount(order: Order) -> bool:
    return order.amount <= order.storage_cell.amount


def validate_balance(order: Order) -> bool:
    return order.profile.balance >= get_total(order)


def validate_new_order(order: Order) -> bool:
    cart = get_orders_by_profile(order.profile)

    if cart.filter(storage_cell=order.storage_cell).first():
        return False

    return validate_amount(order)


def pay(order: Order) -> Optional[Transaction]:
    if not validate_amount(order) or not validate_balance(order):
        return None

    try:
        with transaction.atomic():
            _extract_amount_in_storage(order)
            _extract_total_from_balance(order)
            _mark_order_as_ready(order)

        return _get_transaction(order)
    except IntegrityError:
        return None


def _extract_amount_in_storage(order: Order) -> None:
    storage = order.storage_cell
    storage.amount -= order.amount
    storage.save()


def _extract_total_from_balance(order: Order) -> None:
    profile = order.profile
    profile.balance -= get_total(order)
    profile.save()


def _mark_order_as_ready(order: Order) -> None:
    order.in_cart = False
    order.status = StatusChoices.IN_PROCESS
    order.save()


def _get_transaction(order: Order) -> Transaction:
    return Transaction.objects.create(
        type=TransactionTypes.BUYING,
        source=order.profile,
        accrual=get_total(order),
        order=order
    )
