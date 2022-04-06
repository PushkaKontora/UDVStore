from rest_framework import serializers

from api.internal.models.store.transactions import Transaction, TransactionTypes


class GiftSerializer(serializers.ModelSerializer):
    def create(self, validated_data) -> Transaction:
        gift = Transaction(**validated_data)
        gift.type = TransactionTypes.COIN_GIFTING
        gift.save()

        return gift

    class Meta:
        model = Transaction
        exclude = ("type",)
