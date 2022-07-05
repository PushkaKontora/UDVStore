from rest_framework.serializers import ModelSerializer

from api.internal.models.store import Transaction
from api.internal.serializers.admin.RequestSerializer import RequestSerializer
from api.internal.serializers.cart import OrderSerializer
from api.internal.serializers.transaction.TransactionFileSerializer import TransactionFileSerializer
from api.internal.user.domain.serializers.user import UserSerializer


class TransactionSerializer(ModelSerializer):
    from_profile = UserSerializer(source="source", required=False)
    to_profile = UserSerializer(source="destination", required=False)
    order = OrderSerializer(required=False)
    request = RequestSerializer(required=False)
    files = TransactionFileSerializer(many=True)

    class Meta:
        model = Transaction
        fields = (
            "id",
            "type",
            "from_profile",
            "to_profile",
            "accrual",
            "description",
            "created_at",
            "order",
            "request",
            "files",
        )
        extra_kwargs = {
            "type": {"required": False},
            "description": {"required": True},
            "order": {"required": False},
            "accrual": {"required": False},
        }
