from typing import List

from django.core.validators import MinValueValidator
from rest_framework import serializers

from api.internal.models.store import Transaction, TransactionTypes
from api.internal.services.user import get_profiles


class AccrualRequestSerializer(serializers.Serializer):
    profile_ids = serializers.PrimaryKeyRelatedField(queryset=get_profiles(), many=True, allow_empty=False)
    price = serializers.IntegerField(validators=[MinValueValidator(1)])
    comment = serializers.CharField(max_length=Transaction.DESCRIPTION_LENGTH, allow_blank=True, allow_null=True)

    def update(self, instance, validated_data):
        raise Exception("Not available")

    def create(self, validated_data) -> List[Transaction]:
        ids = validated_data["profile_ids"]
        price = validated_data["price"]
        comment = validated_data["comment"]

        return [Transaction(
            type=TransactionTypes.DEPOSIT,
            source=None,
            destination=destination,
            accrual=price,
            order=None,
            description=comment
        ) for destination in ids]
