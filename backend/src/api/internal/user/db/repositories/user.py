from typing import Iterable, Optional

from django.db.models import F

from api.internal.user.db.models import Profile
from api.internal.user.domain.interfaces import IUserRepository


class UserRepository(IUserRepository):
    def get_profile(self, user_id: int) -> Optional[Profile]:
        return Profile.objects.filter(id=user_id).first()

    def get_balance(self, user_id: int) -> int:
        return Profile.objects.filter(id=user_id)[:1].values_list("balance", flat=True)[0]

    def decrease_balance(self, profile_id: int, amount: int) -> None:
        if amount <= 0:
            raise ValueError("Amount must be greater than 0")

        Profile.objects.select_for_update().filter(id=profile_id)[:1].update_amount(balance=F("balance") - amount)

    def many_increase_balance(self, profile_ids: Iterable[int], amount: int) -> None:
        Profile.objects.select_for_update().bulk_update(
            Profile(id=id_, balance=F("balance") + amount) for id_ in profile_ids
        )
