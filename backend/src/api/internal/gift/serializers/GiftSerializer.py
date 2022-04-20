from rest_framework import serializers

from api.internal.models.profile import Profile
from api.internal.models.store.transactions import Transaction


class GiftSerializer(serializers.ModelSerializer):
    destination = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())

    class Meta:
        model = Transaction
        fields = ("source", "destination", "description", "accrual")
