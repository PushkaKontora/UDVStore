from typing import Optional

from django.db import IntegrityError
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.internal.modules.product.serializers import ProductSerializer, StorageCellSerializer
from api.models import Product, StorageCell


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ("get", "post", "patch", "delete")

    @action(
        methods=["get", "post"],
        detail=True,
        url_path="cells",
        url_name="cells",
        permission_classes=[
            IsAuthenticated,
        ],
    )
    def cells(self, request: Request, pk=None) -> Response:
        if request.method == "POST":
            return self._add_cells(request, pk)
        elif request.method == "GET":
            return self._get_cells(request, pk)

        return Response(status=405)

    def _add_cells(self, request: Request, pk: Optional[int]) -> Response:
        try:
            for cell in request.data:
                serializer = StorageCellSerializer(data=cell)
                serializer.is_valid(raise_exception=True)

                StorageCell.objects.create(product_id=pk, **serializer.data)
        except IntegrityError:
            return Response(status=400)

        return Response(status=200)

    def _get_cells(self, request: Request, pk: Optional[int]) -> Response:
        product = Product.objects.filter(pk=pk).first()
        if not product:
            return Response(status=400)

        serializer = StorageCellSerializer(product.cells_in_storage, many=True)

        return Response(serializer.data)
