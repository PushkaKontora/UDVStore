import json
from decimal import Decimal
from json import JSONDecodeError
from typing import Optional

from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.internal.serializers.product import ProductIDSerializer, ProductSerializer
from api.internal.serializers.storage_cell import StorageInSerializer
from api.internal.services.admin import toggle_product_visible, try_create_product, try_update_product
from api.internal.services.product import get_existed_products


class ProductAdministrationViewSet(ModelViewSet):
    queryset = get_existed_products()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def create(self, request: Request, *args, **kwargs) -> Response:
        data = self._validate_data(request)
        if not data:
            return Response(status=400)

        product = try_create_product(
            data["name"], data["photo"], data["description"], Decimal(data["price"]), data["cells"]
        )
        if not product:
            return Response(status=422)

        return Response(data=ProductSerializer(product, context={"request": request}).data)

    def partial_update(self, request: Request, pk=None, **kwargs) -> Response:
        if not self.queryset.filter(id=pk).exists():
            return Response(status=404)

        data = self._validate_data(request, partial=True)
        if not data:
            return Response(status=400)

        was_updated = try_update_product(
            pk, data["name"], data["photo"], data["description"], Decimal(data["price"]), data["cells"]
        )

        return Response(status=200 if was_updated else 500)

    def destroy(self, request, pk=None, **kwargs) -> Response:
        self.get_queryset().filter(id=pk).update(is_deleted=True)

        return Response(status=200)

    @action(methods=["PATCH"], detail=True)
    def switch(self, request: Request, pk=None) -> Response:
        serializer = ProductIDSerializer(data={"id": pk})
        serializer.is_valid(raise_exception=True)

        is_visible = toggle_product_visible(pk)

        return Response(data={"is_visible": is_visible})

    def _validate_data(self, request: Request, partial=False) -> Optional[dict]:
        data = {
            "name": request.data.get("name"),
            "photo": request.FILES.get("photo"),
            "description": request.data.get("description"),
            "price": request.data.get("price"),
        }

        ser_data = dict((key, value) for key, value in data.items() if value is not None) if partial else data

        product_serializer = ProductSerializer(data=ser_data, partial=partial)
        product_serializer.is_valid(raise_exception=True)

        try:
            cells = json.loads(str(request.data.get("cells")))

            cell_serializer = StorageInSerializer(data=cells, many=True)
            cell_serializer.is_valid(raise_exception=True)

            data["cells"] = cells
        except JSONDecodeError:
            return None

        return data
