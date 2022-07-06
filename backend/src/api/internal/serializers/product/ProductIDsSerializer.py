from rest_framework import serializers

from api.internal.models.store import Product


class ProductIDsSerializer(serializers.Serializer):
    ids = serializers.PrimaryKeyRelatedField(source="id", many=True, queryset=Product.objects.all())
