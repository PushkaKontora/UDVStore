from django.core.validators import MinValueValidator
from djoser.conf import User
from rest_framework import serializers

from api.internal.models.store import Order, StorageCell


class DeclarationSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    storage_cell = serializers.PrimaryKeyRelatedField(queryset=StorageCell.objects.all())
    amount = serializers.IntegerField(validators=[MinValueValidator(1)])
