from typing import List

from django.db import IntegrityError
from django.db.transaction import atomic

from api.internal.models.profile import Profile
from api.internal.models.store import Transaction


def try_accrue(transactions: List[Transaction]) -> bool:
    try:
        with atomic():
            for transaction in transactions:
                _increase_balance(transaction.destination, transaction.accrual)

                transaction.save()

        return True
    except IntegrityError:
        return False


def _increase_balance(destination: Profile, accrual: int) -> None:
    destination.balance += accrual
    destination.save()
