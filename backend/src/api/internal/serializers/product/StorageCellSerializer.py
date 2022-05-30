from rest_framework.serializers import ModelSerializer

from api.models import StorageCell


class StorageCellSerializer(ModelSerializer):
    class Meta:
        model = StorageCell
        exclude = ("product",)
