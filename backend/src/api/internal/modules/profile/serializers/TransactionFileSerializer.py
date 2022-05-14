from rest_framework.serializers import ModelSerializer

from api.internal.models.store import TransactionFile


class TransactionFileSerializer(ModelSerializer):
    class Meta:
        model = TransactionFile
        fields = ("id", "filename")
