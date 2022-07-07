from rest_framework.serializers import ModelSerializer

from api.internal.models.storage_cell import StorageCell


class StorageCellSerializer(ModelSerializer):
    class Meta:
        model = StorageCell
        fields = "__all__"


class StorageInSerializer(ModelSerializer):
    class Meta:
        model = StorageCell
        exclude = ["product"]
