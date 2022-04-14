from rest_framework.serializers import ModelSerializer

from api.internal.models.store import Transaction
from api.internal.profile.serializers.ProfileSerializer import ProfileSerializer


class TransactionSerializer(ModelSerializer):
    # order = ...
    from_profile = ProfileSerializer(source="source")
    to_profile = ProfileSerializer(source="destination")

    class Meta:
        model = Transaction
        fields = ("id", "type", "from_profile", "to_profile", "accrual",
                   "description", "created_at")