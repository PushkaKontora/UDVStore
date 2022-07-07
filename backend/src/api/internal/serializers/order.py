from rest_framework import serializers

from api.internal.models.order import Order
from api.internal.models.transaction import Transaction
from api.internal.serializers.product import ProductDetailsSerializer
from api.internal.serializers.profile import ProfileSerializer
from api.internal.services.cart import get_total


class OrderSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    product = ProductDetailsSerializer(source="storage_cell")
    total = serializers.SerializerMethodField(method_name="get_total")

    def get_total(self, order: Order) -> int:
        return get_total(order)

    class Meta:
        model = Order
        fields = ["id", "profile", "status", "product", "amount", "in_cart", "total"]


class FormedOrderSerializer(serializers.ModelSerializer):
    order = OrderSerializer()

    class Meta:
        model = Transaction
        fields = ["id", "created_at", "order"]
