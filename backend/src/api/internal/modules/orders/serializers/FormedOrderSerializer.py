from rest_framework import serializers

from api.internal.models.store import Transaction


class FormedOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        exclude = ("type", "destination", "description")
