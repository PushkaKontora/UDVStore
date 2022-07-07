from typing import List

from django.core.validators import MinValueValidator
from rest_framework import serializers

from api.internal.models.transaction import Transaction, TransactionTypes
from api.internal.services.admin import get_requests_from_users
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

        return [
            Transaction(
                type=TransactionTypes.DEPOSIT,
                source=None,
                destination=destination,
                accrual=price,
                order=None,
                description=comment,
            )
            for destination in ids
        ]


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        exclude = ["order", "response"]


class TransactionVerdictSerializer(serializers.Serializer):
    transaction_id = serializers.PrimaryKeyRelatedField(queryset=get_requests_from_users(), many=False)
    amount = serializers.IntegerField(validators=[MinValueValidator(1)], required=False, default=0)
    comment = serializers.CharField(max_length=Transaction.DESCRIPTION_LENGTH, allow_blank=True, allow_null=True)
    status = serializers.ChoiceField(choices=TransactionTypes.choices)

    def create(self, validated_data):
        related = validated_data["transaction_id"]
        status = validated_data["status"]

        if related is None:
            raise Exception("Transaction with such id not found: " + related.id)

        result = Transaction(
            type=status,
            destination=related.source,
            accrual=validated_data["amount"],
            description=validated_data["comment"],
        )
        return result
