from rest_framework.serializers import ModelSerializer

from api.internal.modules.product.serializers.StorageCellSerializer import StorageCellSerializer
from api.models import Product


class ProductSerializer(ModelSerializer):
    cells = StorageCellSerializer(source="cells_in_storage", many=True, required=False)

    class Meta:
        model = Product
        fields = ("id", "name", "description", "price", "photo", "cells")
