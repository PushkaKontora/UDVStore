from typing import Set

from django.db import IntegrityError
from django.db.transaction import atomic

from api.internal.models.store import TransactionTypes
from api.internal.user.domain.interfaces import ITransactionRepository, IUserRepository


class GiftService:
    def __init__(self, user_repo: IUserRepository, transaction_repo: ITransactionRepository):
        self._user_repo = user_repo
        self._transaction_repo = transaction_repo

    def try_create(self, source_id: int, destination_ids: Set[int], accrual: int, message: str) -> bool:
        total = len(destination_ids) * accrual

        if source_id in destination_ids:
            raise ValueError("Source cannot be destination")

        try:
            with atomic():
                if total > self._user_repo.get_balance(source_id):
                    return False

                self._user_repo.decrease_balance(source_id, accrual)
                self._user_repo.many_increase_balance(destination_ids, accrual)
                self._transaction_repo.many_declare(
                    source_id, destination_ids, TransactionTypes.COIN_GIFTING, accrual, message
                )

                return True
        except IntegrityError:
            return False
