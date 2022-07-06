from abc import ABC, abstractmethod
from typing import Optional

from django.db.models import QuerySet

from api.internal.user.db.models import Order, StatusChoices


class IOrderRepository(ABC):
    @abstractmethod
    def get_orders_in_cart(self, user_id: int) -> QuerySet[Order]:
        ...

    @abstractmethod
    def get_order_in_cart(self, user_id: int, order_id: int) -> Optional[Order]:
        ...

    @abstractmethod
    def create(self, user_id: int, storage_cell_id: int, amount: int) -> Order:
        ...

    @abstractmethod
    def exists_in_cart(self, user_id: int, storage_cell_id: int) -> bool:
        ...

    @abstractmethod
    def update_amount(self, order_id: int, amount: int) -> bool:
        ...

    @abstractmethod
    def update_status(self, order_id: int, status_id: int) -> bool:
        ...

    @abstractmethod
    def delete_by_user(self, user_id: int, order_id: int) -> bool:
        ...

    @abstractmethod
    def pay(self, order: Order) -> None:
        ...

    @abstractmethod
    def get_formed_order_by_transaction(self, transaction_id: int) -> Optional[Order]:
        ...
