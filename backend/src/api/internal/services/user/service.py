from typing import Optional, Union, Iterable

from django.contrib.auth.models import User
from django.db.models import Q, QuerySet

from api.internal.models.profile import Profile


def get_profile(id_: Union[int, str]) -> Optional[Profile]:
    return get_profiles().filter(id=id_).first()


def get_default_user_profile(user: User) -> Profile:
    return get_profiles().filter(user=user).first()


def get_profiles() -> QuerySet[Profile]:
    return Profile.objects.filter(user__is_staff=False)


def get_profiles_without(user: User) -> QuerySet[Profile]:
    return get_profiles().filter(~Q(user=user))


def get_destinations(source_id: int, ids: Iterable[int]) -> QuerySet[Profile]:
    return get_profiles().filter(Q(id__in=ids) & ~Q(id=source_id))
