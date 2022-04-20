from typing import Union, Optional

from django.contrib.auth.models import User
from django.db.models import QuerySet

from api.internal.models.profile import Profile


def get_profile_by_user(user: User) -> Profile:
    return Profile.objects.filter(user=user).first()


def get_profiles() -> QuerySet[Profile]:
    return Profile.objects.all()


def get_profile(id_: Union[int, str]) -> Optional[Profile]:
    return get_profiles().filter(id=id_).first()
