from django.db import IntegrityError
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from api.models import Product, StorageCell
from api.internal.product.serializers import StorageCellSerializer, ProductSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, )
    http_method_names = ("get", "post", "patch", "delete")

    @action(methods=["POST"],
            detail=True,
            url_path="cells", url_name="cells",
            permission_classes=[IsAuthenticated, ])
    def set_cells(self, request: Request, pk=None) -> Response:
        cells = request.data.get("cells")
        if not cells:
            return Response(status=400)

        try:
            for cell in cells:
                serializer = StorageCellSerializer(data=cell)
                serializer.is_valid(raise_exception=True)

                StorageCell.objects.create(product_id=pk, **serializer.data)
        except IntegrityError:
            return Response(status=400)

        return Response(status=200)

    @action(methods=["GET"],
            detail=True,
            url_path="cells", url_name="cells",
            permission_classes=[IsAuthenticated, ])
    def get_cells(self, request: Request, pk=None) -> Response:
        product = Product.objects.filter(pk=pk).first()
        if not product:
            return Response(status=400)

        serializer = StorageCellSerializer(product.cells_in_storage, many=True)

        return Response(serializer.data)
