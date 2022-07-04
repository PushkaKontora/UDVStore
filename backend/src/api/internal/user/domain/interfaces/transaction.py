from abc import ABC, abstractmethod
from typing import Optional

from api.internal.models.store import Transaction, TransactionTypes
from api.internal.user.db.models import Order


class ITransactionRepository(ABC):
    @abstractmethod
    def declare(self, user_id: int, typeof: TransactionTypes, accrual: int, order: Optional[Order]) -> Transaction:
        ...
