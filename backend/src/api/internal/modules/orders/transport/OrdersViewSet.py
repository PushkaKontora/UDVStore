from typing import Callable

from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.internal.serializers import TransactionSerializer
from api.internal.services.order import get_formed_orders, get_formed_orders_by_user


class OrdersViewSet(GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request: Request) -> Response:
        return self._get_orders_details(request, get_formed_orders)

    def retrieve(self, request: Request, pk=None) -> Response:
        return self._get_orders_details(request, lambda: get_formed_orders_by_user(pk))

    def _get_orders_details(self, request: Request, get_transaction_orders: Callable) -> Response:
        transactions = get_transaction_orders()

        serializer = TransactionSerializer(transactions, many=True, context={"request": request})

        return Response(serializer.data)
