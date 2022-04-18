from rest_framework.serializers import ModelSerializer, SerializerMethodField

from api.internal.models.store.storage_cells.SizeChoices import SizeChoices
from api.models import StorageCell


class StorageCellSerializer(ModelSerializer):
    name = SerializerMethodField(method_name="get_name")

    def get_name(self, cell: StorageCell) -> str:
        return SizeChoices(cell.size).name

    class Meta:
        model = StorageCell
        exclude = ("product",)
