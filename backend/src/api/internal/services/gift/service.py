from typing import List, Optional

from django.db import IntegrityError, transaction
from django.db.models import F

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
            source.balance = F("balance") - accrual
            destination.balance = F("balance") + accrual

            source.save(update_fields=("balance",))
            destination.save(update_fields=("balance",))

            source.refresh_from_db(fields=("balance",))
            destination.refresh_from_db(fields=("balance",))

        return _get_transaction(source, destination, description, accrual)
    except IntegrityError:
        return None


def _get_transaction(source: Profile, destination: Profile, description: str, accrual: int) -> Transaction:
    return Transaction.objects.create(
        type=TransactionTypes.COIN_GIFTING,
        source=source,
        destination=destination,
        description=description,
        accrual=accrual,
    )
