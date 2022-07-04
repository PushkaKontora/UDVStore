from typing import Optional

from api.internal.models.store import Transaction, TransactionTypes
from api.internal.user.db.models import Order
from api.internal.user.domain.interfaces import ITransactionRepository


class TransactionRepository(ITransactionRepository):
    def declare(self, user_id: int, typeof: TransactionTypes, accrual: int, order: Optional[Order]) -> Transaction:
        return Transaction.objects.create(source_id=user_id, type=typeof, accrual=accrual, order=order)
