from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.internal.serializers.product import ProductSerializer
from api.models import Product


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
