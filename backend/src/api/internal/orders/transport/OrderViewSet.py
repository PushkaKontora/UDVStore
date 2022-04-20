from rest_framework.mixins import RetrieveModelMixin
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.internal.orders.serializers import OrderSerializer
from api.internal.services.order import get_formed_order_by_transaction


class OrderViewSet(RetrieveModelMixin, GenericViewSet):
    def retrieve(self, request: Request, pk=None, **kwargs) -> Response:
        order = get_formed_order_by_transaction(pk)

        return Response(
            data=OrderSerializer(order, context={"request": request}).data
        ) if order else Response(status=400)
