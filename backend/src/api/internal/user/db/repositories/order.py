from typing import Optional

from django.db.models import F, QuerySet

from api.internal.user.db.models import Order, StatusChoices
from api.internal.user.domain.interfaces.order import IOrderRepository


class OrderRepository(IOrderRepository):
    def get_orders_in_cart(self, user_id: int) -> QuerySet[Order]:
        return Order.objects.filter(user_id=user_id, in_cart=True)

    def get_order_in_cart(self, user_id: int, order_id: int) -> Optional[Order]:
        return self.get_orders_in_cart(user_id).filter(id=order_id).first()

    def create(self, user_id: int, storage_cell_id: int, amount: int) -> Order:
        return Order.objects.create(user_id=user_id, storage_cell_id=storage_cell_id, amount=amount)

    def exists_in_cart(self, user_id: int, storage_cell_id: int) -> bool:
        return self.get_orders_in_cart(user_id).filter(storage_cell_id=storage_cell_id).exists()

    def update(self, order_id: int, amount: int) -> bool:
        return Order.objects.filter(id=order_id).update(amount=amount) > 0

    def delete_by_user(self, user_id: int, order_id: int) -> bool:
        return tuple(Order.objects.filter(user_id=user_id, id=order_id).delete())[0] > 0

    def pay(self, order: Order) -> None:
        order.storage_cell.amount = F("amount") - order.amount
        order.in_cart = False
        order.status = StatusChoices.IN_PROCESS

        order.save(update_fields=["in_cart", "status"])
        order.storage_cell.save(update_fields=["amount"])
