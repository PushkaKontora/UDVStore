from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.internal.cart.serializers import OrderSerializer
from api.internal.cart.serializers.CartSerializer import CartSerializer
from api.internal.models.store import Order
from api.internal.services.cart.service import validate_new_order
from api.internal.services.user import get_profile_by_user


class CartViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, )
    http_method_names = ("get", "post", "patch", "delete")

    def create(self, request: Request, *args, **kwargs) -> Response:
        profile = get_profile_by_user(request.user)
        data = {
            "profile": profile.id,
            "storage_cell": request.data.get("storage_cell"),
            "amount": request.data.get("amount"),
        }

        serializer = CartSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        order = serializer.save()
        if validate_new_order(order, profile):
            serialized_order = OrderSerializer(order, context={"request": request})
            order.save()

            return Response(data=serialized_order.data)

        return Response(status=400)
