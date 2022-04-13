from rest_framework.serializers import *

from api.internal.models.profile import Profile


class ProfileSerializer(ModelSerializer):
    username = CharField(source="user.username", required=False)
    first_name = CharField(source="user.first_name", required=False)
    last_name = CharField(source="user.last_name", required=False)
    email = EmailField(source="user.email", required=False)

    class Meta:
        model = Profile
        fields = ("id", "username", "first_name", "last_name", "email",
                  "patronymic", "balance")
        extra_kwargs = {
            "patronymic" : {"required": False},
            "balance": {"read_only": True}
        }
