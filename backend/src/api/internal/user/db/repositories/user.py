from typing import Optional

from django.db.models import F

from api.internal.user.db.models import Profile
from api.internal.user.domain.interfaces import IUserRepository


class UserRepository(IUserRepository):
    def get_profile(self, user_id: int) -> Optional[Profile]:
        return Profile.objects.filter(id=user_id).first()

    def decrease_balance(self, profile_id: int, amount: int) -> None:
        if amount <= 0:
            raise ValueError("Amount must be greater than 0")

        Profile.objects.select_for_update().filter(id=profile_id)[:1].update(balance=F("balance") - amount)
