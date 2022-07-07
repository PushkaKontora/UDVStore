import json
from json import JSONDecodeError

from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.internal.models.product import Product
from api.internal.serializers.product import ProductSerializer
from api.internal.serializers.storage_cell import StorageInSerializer
from api.internal.services.admin import try_create_product


class ProductAdministrationViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def create(self, request: Request, *args, **kwargs) -> Response:
        data = {
            "name": request.data.get("name"),
            "photo": request.FILES.get("photo"),
            "description": request.data.get("description"),
            "price": request.data.get("price"),
        }

        product_serializer = ProductSerializer(data=data)
        product_serializer.is_valid(raise_exception=True)

        try:
            cells = json.loads(str(request.data.get("cells")))

            cell_serializer = StorageInSerializer(data=cells, many=True)
            cell_serializer.is_valid(raise_exception=True)
        except JSONDecodeError:
            return Response(status=400)

        product = try_create_product(data["name"], data["photo"], data["description"], data["price"], cells)
        if not product:
            return Response(status=422)

        return Response(data=ProductSerializer(product, context={"request": request}).data)
