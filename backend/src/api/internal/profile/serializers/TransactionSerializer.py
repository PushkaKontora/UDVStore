from rest_framework.serializers import ModelSerializer

from api.internal.models.store import Transaction
from api.internal.profile.serializers.ProfileSerializer import ProfileSerializer


class TransactionSerializer(ModelSerializer):
    # order = ...
    from_profile = ProfileSerializer(source="source", required=False)
    to_profile = ProfileSerializer(source="destination", required=False)

    class Meta:
        model = Transaction
        fields = ("id", "type", "from_profile", "to_profile", "accrual",
                   "description", "created_at", "order", "files")
        extra_kwargs = {
            "type": {"required": False},
            "description": {"required": True},
            "order": {"required": False},
            "accrual": {"required": False}
        }