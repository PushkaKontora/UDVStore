from decimal import Decimal
from typing import Iterable, List, Optional, Union

from django.contrib.auth.models import User
from django.db import IntegrityError, transaction
from django.db.models import F, QuerySet

from api.internal.models.order import Order, StatusChoices
from api.internal.models.profile import Profile
from api.internal.models.storage_cell import StorageCell
from api.internal.models.transaction import Transaction, TransactionTypes
from api.internal.services.user import get_default_user_profile


def get_order(pk: Union[int, str], profile: Profile) -> Order:
    return Order.objects.filter(pk=pk, profile=profile).first()


def get_storage_cell_by_id(storage_id: Union[int, str]) -> Optional[StorageCell]:
    return StorageCell.objects.filter(id=storage_id).first()


def get_orders_by_user(user: User) -> QuerySet[Order]:
    profile = get_default_user_profile(user)
    return get_orders_by_profile(profile)


def get_orders_by_profile(profile: Profile) -> QuerySet[Order]:
    return Order.objects.filter(profile=profile, in_cart=True)


def get_total(order: Order) -> Decimal:
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

    transactions = []
    try:
        with transaction.atomic():
            for order in orders:
                storage, profile, total = order.storage_cell, order.profile, get_total(order)

                storage.amount = F("amount") - order.amount
                profile.balance = F("balance") - total
                order.in_cart = False
                order.status = StatusChoices.IN_PROCESS

                order.save(update_fields=("in_cart", "status"))
                storage.save(update_fields=("amount",))
                profile.save(update_fields=("balance",))

                transactions.append(
                    Transaction.objects.create(
                        type=TransactionTypes.BUYING, source=order.profile, accrual=total, order=order
                    )
                )

                storage.refresh_from_db(fields=("amount",))
                profile.refresh_from_db(fields=("balance",))

        return transactions
    except IntegrityError:
        return []
