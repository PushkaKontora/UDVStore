from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.models import Product
from api.internal.products.serializers import ProductSerializer


class ProductsViewSet(ModelViewSet):
    queryset = Product.objects.all().order_by("pk")
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, )
    http_method_names = ("get", "post", "patch", "delete")
