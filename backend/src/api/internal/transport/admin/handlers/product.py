import json
from decimal import Decimal
from json import JSONDecodeError

from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.internal.serializers.product import ProductIDSerializer, ProductSerializer
from api.internal.serializers.storage_cell import StorageInSerializer
from api.internal.services.admin import toggle_product_visible, try_create_product
from api.internal.services.product import get_products


class ProductAdministrationViewSet(ModelViewSet):
    queryset = get_products()
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

        product = try_create_product(data["name"], data["photo"], data["description"], Decimal(data["price"]), cells)
        if not product:
            return Response(status=422)

        return Response(data=ProductSerializer(product, context={"request": request}).data)

    def destroy(self, request, pk=None, **kwargs) -> Response:
        self.get_queryset().filter(id=pk).update(is_deleted=True)

        return Response(status=200)

    @action(methods=["PATCH"], detail=True)
    def switch(self, request: Request, pk=None) -> Response:
        serializer = ProductIDSerializer(data={"id": pk})
        serializer.is_valid(raise_exception=True)

        is_visible = toggle_product_visible(pk)

        return Response(data={"is_visible": is_visible})
