from typing import Union, Optional, List, Iterable

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


def validate_amount(orders: Iterable[Order]) -> bool:
    return all(order.amount <= order.storage_cell.amount for order in orders)


def validate_balance(orders: Iterable[Order]) -> bool:
    return all(order.profile.balance >= get_total(order) for order in orders)


def validate_new_order(order: Order) -> bool:
    cart = get_orders_by_profile(order.profile)

    if cart.filter(storage_cell=order.storage_cell).first():
        return False

    return validate_amount([order])


def pay(orders: Iterable[Order]) -> List[Transaction]:
    if not validate_amount(orders) or not validate_balance(orders):
        return []

    try:
        with transaction.atomic():
            _extract_amount_in_storage(orders)
            _extract_total_from_balance(orders)
            _mark_order_as_ready(orders)

        return _get_transactions(orders)
    except IntegrityError:
        return []


def _extract_amount_in_storage(orders: Iterable[Order]) -> None:
    for order in orders:
        storage = order.storage_cell
        storage.amount -= order.amount
        storage.save()


def _extract_total_from_balance(orders: Iterable[Order]) -> None:
    for order in orders:
        profile = order.profile
        profile.balance -= get_total(order)
        profile.save()


def _mark_order_as_ready(orders: Iterable[Order]) -> None:
    for order in orders:
        order.in_cart = False
        order.status = StatusChoices.IN_PROCESS
        order.save()


def _get_transactions(orders: Iterable[Order]) -> List[Transaction]:
    return [Transaction.objects.create(
        type=TransactionTypes.BUYING,
        source=order.profile,
        accrual=get_total(order),
        order=order
    ) for order in orders]
