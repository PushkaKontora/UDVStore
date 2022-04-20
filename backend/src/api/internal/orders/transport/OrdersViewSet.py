from typing import Callable

from rest_framework import mixins
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.internal.orders.serializers import OrderSerializer
from api.internal.services.order import get_formed_orders, get_user_formed_orders


class OrdersViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    GenericViewSet):

    def list(self, request: Request, **kwargs) -> Response:
        return self._get_orders_details(request, get_formed_orders)

    def retrieve(self, request: Request, pk=None, **kwargs) -> Response:
        return self._get_orders_details(request, lambda: get_user_formed_orders(pk))

    def _get_orders_details(self, request: Request, get_orders: Callable):
        orders = get_orders()

        serializer = OrderSerializer(orders, many=True, context={"request": request})

        return Response(serializer.data)
