from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from api.internal.permissions import IsDefaultUser
from api.internal.user.db.repositories import OrderRepository, StorageRepository, TransactionRepository, UserRepository
from api.internal.user.domain.serializers import OrderDeclarationSerializer, OrderSerializer
from api.internal.user.domain.services import CartService


class CartViewSet(ViewSet):
    permission_classes = [IsAuthenticated, IsDefaultUser]
    http_method_names = ["GET", "POST", "PATCH", "DELETE"]

    cart_service = CartService(
        order_repo=OrderRepository(),
        storage_repo=StorageRepository(),
        user_repo=UserRepository(),
        transaction_repo=TransactionRepository(),
    )

    def list(self, request: Request) -> Response:
        orders = self.cart_service.get_orders_in_cart(request.user)

        serializer = OrderSerializer(orders, many=True, context={"request": request})

        return Response(data=serializer.data)

    def retrieve(self, request: Request, pk: int) -> Response:
        order = self.cart_service.get_order_in_cart(request.user, order_id=pk)

        if not order:
            return Response(status=404)

        return Response(data=OrderSerializer(order, context={"request": request}).data)

    def create(self, request: Request) -> Response:
        data = self._get_data(request)

        serializer = OrderDeclarationSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        order = self.cart_service.try_create_order(data["user"], data["storage_cell"], data["amount"])

        if not order:
            return Response(status=422)

        return Response(data=OrderSerializer(order, context={"request": request}).data)

    def partial_update(self, request: Request, pk: int) -> Response:
        data = self._get_data(request)

        order = self.cart_service.get_order_in_cart(request.user, order_id=pk)
        if not order:
            return Response(status=404)

        cart_serializer = OrderDeclarationSerializer(order, data=data, partial=True)
        cart_serializer.is_valid(raise_exception=True)

        was_updated = self.cart_service.try_update_order(order, data["amount"])

        return Response(status=200 if was_updated else 422)

    def destroy(self, request: Request, pk: int) -> Response:
        was_deleted = self.cart_service.try_delete_order(request.user, order_id=pk)

        return Response(status=200 if was_deleted else 404)

    @action(methods=["POST"], detail=False)
    def pay(self, request: Request) -> Response:
        was_paid = self.cart_service.try_pay(request.user)

        return Response(status=200 if was_paid else 422)

    def _get_data(self, request: Request) -> dict:
        data = {
            "user": request.user,
            "storage_cell": request.data.get("storage_cell"),
            "amount": request.data.get("amount"),
        }

        return dict((field, value) for field, value in data.items() if value is not None)
