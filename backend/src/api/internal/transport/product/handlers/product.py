from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from api.internal.models.product import Product
from api.internal.serializers.product import ProductSerializer


class ProductViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Product.objects.filter(is_visible=True)
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
