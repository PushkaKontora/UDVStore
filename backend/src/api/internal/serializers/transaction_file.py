from rest_framework import serializers

from api.internal.models.transaction_file import TransactionFile


class TransactionFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionFile
        exclude = ["transaction"]
