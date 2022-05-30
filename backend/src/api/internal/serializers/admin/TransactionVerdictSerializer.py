from django.core.validators import MinValueValidator
from rest_framework import serializers

from api.internal.models.store import Transaction, TransactionTypes
from api.internal.services.admin.service import get_requests_from_users


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
