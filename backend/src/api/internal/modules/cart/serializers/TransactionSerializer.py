from rest_framework import serializers

from api.internal.models.store import Transaction
from api.internal.serializers.OrderSerializer import OrderSerializer


class TransactionSerializer(serializers.ModelSerializer):
    order = OrderSerializer()

    class Meta:
        model = Transaction
        fields = ("type", "source", "destination", "accrual", "order", "description", "created_at")
