from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from api.internal.serializers.product import ProductSerializer
from api.internal.services.product import get_products


class ProductViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = get_products().filter(is_visible=True)
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
