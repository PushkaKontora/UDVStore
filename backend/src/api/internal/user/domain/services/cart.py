from typing import Optional

from django.db import IntegrityError
from django.db.models import QuerySet
from django.db.transaction import atomic
from djoser.conf import User

from api.internal.models.store import TransactionTypes
from api.internal.user.db.models import Order
from api.internal.user.domain.interfaces import (
    IOrderRepository,
    IStorageRepository,
    ITransactionRepository,
    IUserRepository,
)


class CartService:
    def __init__(
        self,
        order_repo: IOrderRepository,
        storage_repo: IStorageRepository,
        user_repo: IUserRepository,
        transaction_repo: ITransactionRepository,
    ):
        self._order_repo = order_repo
        self._storage_repo = storage_repo
        self._user_repo = user_repo
        self._transaction_repo = transaction_repo

    def get_orders_in_cart(self, user: User) -> QuerySet[Order]:
        return self._order_repo.get_orders_in_cart(user.id)

    def get_order_in_cart(self, user: User, order_id: int) -> Optional[Order]:
        return self._order_repo.get_order_in_cart(user.id, order_id)

    def try_create_order(self, user: User, storage_cell: int, amount: int) -> Optional[Order]:
        if self._order_repo.exists_in_cart(user.id, storage_cell) or not self._storage_repo.is_enough_amount(
            storage_cell, amount
        ):
            return None

        return self._order_repo.create(user.id, storage_cell, amount)

    def try_update_order(self, order: Order, amount: int) -> bool:
        if amount > order.storage_cell.amount:
            return False

        return self._order_repo.update(order.id, amount)

    def try_delete_order(self, user: User, order_id: int) -> bool:
        return self._order_repo.delete_by_user(user.id, order_id)

    def try_pay(self, user: User) -> bool:
        profile = self._user_repo.get_profile(user.id)
        if not profile:
            raise ValueError("User does not have profile")

        orders = self.get_orders_in_cart(user).select_for_update()
        if not orders:
            return False

        try:
            with atomic():
                total = sum(order.storage_cell.product.price * order.amount for order in orders)
                if total > profile.balance or not all(order.amount <= order.storage_cell.amount for order in orders):
                    return False

                for order in orders:
                    order_price = order.storage_cell.product.price * order.amount

                    self._order_repo.pay(order)
                    self._transaction_repo.declare(user.id, TransactionTypes.BUYING, order_price, order)

                self._user_repo.decrease_balance(profile.id, total)

                return True
        except IntegrityError:
            return False
