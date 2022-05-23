from rest_framework.serializers import ModelSerializer

from api.internal.models.store import Transaction


class RequestSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        exclude = ("order", "response")
