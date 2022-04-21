from rest_framework.serializers import *

from api.internal.models.profile import Profile


class ProfileSerializer(ModelSerializer):
    username = CharField(source="user.username", required=False)
    first_name = CharField(source="user.first_name", required=False)
    last_name = CharField(source="user.last_name", required=False)
    email = EmailField(source="user.email", required=False)
    is_staff = BooleanField(source="user.is_staff", required=False, read_only=True)

    class Meta:
        model = Profile
        fields = ("id", "username", "first_name", "last_name", "email",
                  "patronymic", "balance", "photo", "is_staff")
        extra_kwargs = {
            "patronymic" : {"required": False},
            "balance": {"read_only": True}
        }
