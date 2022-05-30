from rest_framework import serializers

from api.internal.models.profile import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", required=False)
    first_name = serializers.CharField(source="user.first_name", required=False)
    last_name = serializers.CharField(source="user.last_name", required=False)
    email = serializers.EmailField(source="user.email", required=False)
    is_staff = serializers.BooleanField(source="user.is_staff", required=False, read_only=True)

    class Meta:
        model = Profile
        fields = ("id", "username", "first_name", "last_name", "email", "patronymic", "balance", "photo", "is_staff")
        extra_kwargs = {"patronymic": {"required": False}, "balance": {"read_only": True}}
