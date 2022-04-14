from django.contrib.auth.models import User

from api.internal.models.profile import Profile


def get_profile_by_user(user: User) -> Profile:
    return Profile.objects.filter(user=user).first()
