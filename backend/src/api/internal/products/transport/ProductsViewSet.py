from rest_framework.viewsets import ModelViewSet

from api.models import Product
from api.internal.products.serializers import ProductSerializer


class ProductsViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    http_method_names = ("get", "post", "patch", "delete")

