from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.internal.cart.serializers import OrderSerializer, CartSerializer
from api.internal.models.profile import Profile
from api.internal.models.store import Order
from api.internal.services.cart import (
    validate_new_order,
    get_order,
    validate_amount,
    get_orders_in_cart
)
from api.internal.services.user import get_profile_by_user


class CartViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, )
    http_method_names = ("get", "post", "patch", "delete")

    def list(self, request: Request, *args, **kwargs) -> Response:
        profile = get_profile_by_user(request.user)
        orders = get_orders_in_cart(profile)

        serializer = OrderSerializer(orders, many=True)

        return Response(data=serializer.data)

    def create(self, request: Request, *args, **kwargs) -> Response:
        profile = get_profile_by_user(request.user)
        data = self._get_data(request, profile)

        cart_serializer = CartSerializer(data=data)
        cart_serializer.is_valid(raise_exception=True)

        order = cart_serializer.save()
        if validate_new_order(order):
            order.save()

            return Response(data=OrderSerializer(order, context={"request": request}).data)

        return Response(status=400)

    def update(self, request: Request, pk=None, *args, **kwargs) -> Response:
        profile = get_profile_by_user(request.user)
        data = self._get_data(request, profile)

        order = get_order(pk)
        if not order:
            return Response(status=400)

        cart_serializer = CartSerializer(order, data=data, context=CartSerializer.UPDATE_CONTEXT)
        cart_serializer.is_valid(raise_exception=True)

        updated_order: Order = cart_serializer.save()

        if not validate_amount(updated_order):
            return Response(status=400)

        updated_order.save()

        return Response(OrderSerializer(updated_order, context={"request": request}).data)

    def _get_data(self, request: Request, profile: Profile) -> dict:
        data = {
            "profile": profile.id,
            "storage_cell": request.data.get("storage_cell"),
            "amount": request.data.get("amount"),
        }

        return dict((field, value) for field, value in data.items() if value is not None)
