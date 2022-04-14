from rest_framework import serializers

from api.internal.models.store import StorageCell


class ProductDetailsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="product.name")
    photo = serializers.ImageField(source="product.photo", use_url=True)
    description = serializers.CharField(source="product.description")
    price = serializers.IntegerField(source="product.price")

    class Meta:
        model = StorageCell
        fields = ("name", "photo", "description", "price", "size", "amount")
        read_only_fields = ("name", "photo", "description", "price", "size", "amount")