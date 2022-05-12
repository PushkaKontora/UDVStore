from typing import List

from django.db import IntegrityError
from django.db.models import F, QuerySet
from django.db.transaction import atomic

from api.internal.models.store import Transaction, TransactionTypes


def get_requests_from_users() -> QuerySet[Transaction]:
    return Transaction.objects.filter(type=TransactionTypes.REQUEST).filter(response=None)


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


def try_connect_transactions(old_transaction: Transaction, response: Transaction) -> bool:
    try:
        with atomic():
            old_transaction.response = response
            response.save()
            old_transaction.save()

        return True
    except IntegrityError:
        return False

