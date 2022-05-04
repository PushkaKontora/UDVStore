from typing import List

from django.db import IntegrityError
from django.db.models import QuerySet, F
from django.db.transaction import atomic

from api.internal.models.store import Transaction


def get_deposits() -> QuerySet[Transaction]:
    return Transaction.objects.filter()


def try_accrue(transactions: List[Transaction]) -> bool:
    try:
        with atomic():
            for transaction in transactions:
                destination = transaction.destination
                destination.balance = F("balance") + transaction.accrual

                destination.save(update_fields=("balance",))
                transaction.save()

                destination.refresh_from_db(fields=("balance",))

        return True
    except IntegrityError:
        return False
