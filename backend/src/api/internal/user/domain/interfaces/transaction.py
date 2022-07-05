from abc import ABC, abstractmethod
from typing import Optional, Iterable

from django.db.models import QuerySet

from api.internal.models.store import Transaction, TransactionTypes
from api.internal.user.db.models import Order


class ITransactionRepository(ABC):
    @abstractmethod
    def declare(
        self,
        source_id: int,
        destination_id: Optional[int],
        typeof: TransactionTypes,
        accrual: int,
        description: Optional[str] = None,
        order: Optional[Order] = None,
    ) -> Transaction:
        ...

    @abstractmethod
    def many_declare(
        self,
        source_id: int,
        destination_ids: Iterable[int],
        typeof: TransactionTypes,
        accrual: int,
        description: Optional[str] = None,
        order: Optional[Order] = None,
    ) -> QuerySet[Transaction]:
        ...
