from django.conf import settings
from rest_framework import serializers

from api.internal.models.product import Product
from api.internal.models.storage_cell import StorageCell
from api.internal.serializers.storage_cell import StorageCellSerializer


class ProductSerializer(serializers.ModelSerializer):
    cells = StorageCellSerializer(source="cells_in_storage", many=True, required=False)

    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "photo", "cells"]


class ProductDetailsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="product.name")
    photo = serializers.ImageField(source="product.photo")
    description = serializers.CharField(source="product.description")
    price = serializers.DecimalField(
        source="product.price", max_digits=settings.COINS_AMOUNT_DIGITS, decimal_places=settings.COINS_DECIMAL_PLACES
    )

    class Meta:
        model = StorageCell
        fields = ["id", "name", "photo", "description", "price", "size", "amount"]
