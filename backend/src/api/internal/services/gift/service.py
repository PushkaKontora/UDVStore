from typing import List, Optional

from django.db import IntegrityError, transaction

from api.internal.models.profile import Profile
from api.internal.models.store import Transaction, TransactionTypes


def get_gifts(source: Profile) -> List[Transaction]:
    return Transaction.objects.filter(source=source).all()


def is_enough_money(user: Profile, accrual: int) -> bool:
    return accrual <= user.balance


def try_transfer(source: Profile, destination: Profile, description: str, accrual: int) -> Optional[Transaction]:
    if not is_enough_money(source, accrual):
        return None

    try:
        with transaction.atomic():
            _extract_from_source(source, accrual)
            _add_to_destination(destination, accrual)

        return _get_transaction(source, destination, description, accrual)
    except IntegrityError:
        return None


def _extract_from_source(user: Profile, accrual: int) -> None:
    user.balance -= accrual
    user.save()


def _add_to_destination(user: Profile, accrual: int) -> None:
    user.balance += accrual
    user.save()


def _get_transaction(source: Profile, destination: Profile, description: str, accrual: int) -> Transaction:
    return Transaction.objects.create(
        type=TransactionTypes.COIN_GIFTING,
        source=source,
        destination=destination,
        description=description,
        accrual=accrual,
    )
