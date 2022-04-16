from django.core.validators import MinValueValidator
from rest_framework import serializers

from api.internal.models.profile import Profile
from api.internal.models.store import Order, StorageCell


class CartSerializer(serializers.Serializer):
    profile = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())
    storage_cell = serializers.PrimaryKeyRelatedField(queryset=StorageCell.objects.all())
    amount = serializers.IntegerField(validators=[MinValueValidator(1)])

    UPDATE_CONTEXT = 1

    def __init__(self, *args, **kwargs):
        super(CartSerializer, self).__init__(*args, **kwargs)

        if self.UPDATE_CONTEXT == self.context:
            self.fields["storage_cell"].required = False
            self.fields["amount"].required = False

    def update(self, instance: Order, validated_data: dict) -> Order:
        instance.storage_cell = validated_data.get("storage_cell", instance.storage_cell)
        instance.amount = validated_data.get("amount", instance.amount)

        return instance

    def create(self, validated_data: dict) -> Order:
        return Order(
            profile=validated_data["profile"],
            storage_cell=validated_data["storage_cell"],
            amount=validated_data["amount"]
        )
