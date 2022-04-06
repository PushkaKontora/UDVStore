from rest_framework.serializers import ModelSerializer

from api.models import Product, StorageCell
from api.internal.products.serializers.StorageCellSerializer import StorageCellSerializer


class ProductSerializer(ModelSerializer):
    cells_in_storage = StorageCellSerializer(many=True, required=False)

    def create(self, validated_data) -> Product:
        product = Product.objects.create(
            name=validated_data.get("name"),
            photo=validated_data.get("photo"),
            description=validated_data.get("description"),
            price=validated_data.get("price")
        )

        for cell in validated_data.get("cells_in_storage", []):
            StorageCell.objects.create(product_id=product.id, **cell)

        return product

    class Meta:
        model = Product
        fields = ("id", "name", "description", "price", "photo", "cells_in_storage")
