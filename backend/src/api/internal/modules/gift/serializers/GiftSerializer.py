from rest_framework import serializers

from api.internal.models.profile import Profile
from api.internal.models.store.transactions import Transaction
from api.internal.services.user import get_profiles


class GiftSerializer(serializers.ModelSerializer):
    destination = serializers.PrimaryKeyRelatedField(many=True, queryset=get_profiles())

    class Meta:
        model = Transaction
        fields = ("source", "destination", "description", "accrual")
