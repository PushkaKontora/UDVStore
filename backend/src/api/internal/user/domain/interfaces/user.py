from abc import ABC, abstractmethod
from typing import Optional

from api.internal.user.db.models import Profile


class IUserRepository(ABC):
    @abstractmethod
    def get_profile(self, user_id: int) -> Optional[Profile]:
        ...

    @abstractmethod
    def decrease_balance(self, profile_id: int, amount: int) -> None:
        ...
