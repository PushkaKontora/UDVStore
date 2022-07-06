import json
from json import JSONDecodeError

from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.internal.serializers.product import ProductIDsSerializer, ProductSerializer, StorageCellSerializer
from api.internal.services.admin import try_create_product
from api.internal.services.admin.service import delete_products


class ProductAdministrationView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request: Request) -> Response:
        if request.data is not dict:
            return Response(status=400)

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

            cell_serializer = StorageCellSerializer(data=cells, many=True)
            cell_serializer.is_valid(raise_exception=True)
        except JSONDecodeError:
            return Response(status=400)

        product = try_create_product(data["name"], data["photo"], data["description"], data["price"], cells)
        if not product:
            return Response(status=422)

        return Response(data=ProductSerializer(product, context={"request": request}).data)

    def delete(self, request: Request) -> Response:
        if request.data is not dict:
            return Response(status=400)

        data = {"ids": request.data}

        serializer = ProductIDsSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        delete_products(data["ids"])

        return Response(status=200)
