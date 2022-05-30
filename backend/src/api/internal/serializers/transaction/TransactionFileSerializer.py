from rest_framework import serializers

from api.internal.models.store import TransactionFile


class TransactionFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionFile
        exclude = ("transaction",)
