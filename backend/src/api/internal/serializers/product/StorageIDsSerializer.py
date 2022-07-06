from rest_framework import serializers

from api.internal.models.store import StorageCell


class StorageIDsSerializer(serializers.Serializer):
    ids = serializers.PrimaryKeyRelatedField(source="id", many=True, queryset=StorageCell.objects.all())
