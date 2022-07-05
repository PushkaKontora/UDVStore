from abc import ABC, abstractmethod
from typing import Iterable, Optional

from api.internal.user.db.models import Profile


class IUserRepository(ABC):
    @abstractmethod
    def get_profile(self, user_id: int) -> Optional[Profile]:
        ...

    @abstractmethod
    def get_balance(self, user_id: int) -> int:
        ...

    @abstractmethod
    def decrease_balance(self, profile_id: int, amount: int) -> None:
        ...

    @abstractmethod
    def many_increase_balance(self, profile_ids: Iterable[int], amount: int) -> None:
        ...
