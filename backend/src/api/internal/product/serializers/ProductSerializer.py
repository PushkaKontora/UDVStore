from rest_framework.serializers import ModelSerializer

from api.internal.product.serializers.StorageCellSerializer import StorageCellSerializer
from api.models import Product


class ProductSerializer(ModelSerializer):
    cells_in_storage = StorageCellSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = ("id", "name", "description", "price", "photo", "cells_in_storage")
