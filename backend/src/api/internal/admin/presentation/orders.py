from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.internal.serializers.transaction import TransactionSerializer
from api.internal.user.db.repositories import OrderRepository, StorageRepository, TransactionRepository, UserRepository
from api.internal.user.domain.serializers.order import OrderSerializer
from api.internal.user.domain.services import OrderService, TransactionService


class OrdersViewSet(GenericViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]

    transaction_service = TransactionService(transaction_repo=TransactionRepository())
    order_service = OrderService(
        order_repo=OrderRepository(),
        storage_repo=StorageRepository(),
        user_repo=UserRepository(),
        transaction_repo=TransactionRepository(),
    )

    def list(self, request: Request) -> Response:
        transactions = self.transaction_service.get_orders_details()

        return Response(data=TransactionSerializer(transactions, many=True, context={"request": request}).data)

    def partial_update(self, request: Request, pk: int) -> Response:
        data = {"status": request.data.get("status")}
        order = self.order_service.get_order_by_transaction(transaction_id=pk)

        if not order:
            return Response(status=404)

        serializer = OrderSerializer(order, data=data, partial=True)
        serializer.is_valid(raise_exception=True)

        was_updated = self.order_service.try_update_amount(order, data["status"])

        return Response(status=200 if was_updated else 422)
