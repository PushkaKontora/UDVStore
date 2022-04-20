from rest_framework import serializers

from api.internal.orders.serializers import OrderSerializer
from api.internal.models.store import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    order = OrderSerializer()

    class Meta:
        model = Transaction
        fields = ("type", "source", "destination", "accrual", "order", "description", "created_at")
