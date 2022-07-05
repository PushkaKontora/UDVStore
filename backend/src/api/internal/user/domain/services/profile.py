from typing import Optional

from django.db.models import QuerySet
from djoser.conf import User

from api.internal.user.db.models import Profile
from api.internal.user.domain.interfaces import IUserRepository


class UserService:
    def __init__(self, user_repo: IUserRepository):
        self._user_repo = user_repo

    def get_profile(self, user: User) -> Optional[Profile]:
        return self._user_repo.get_profile(user.id)

    def get_default_profiles_without(self, user: User) -> QuerySet[Profile]:
        return self._user_repo.get_default_profiles_without(user.id)
