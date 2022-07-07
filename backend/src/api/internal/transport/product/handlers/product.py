from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.internal.models.product import Product
from api.internal.serializers.product import ProductSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
