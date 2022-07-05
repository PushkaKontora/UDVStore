from abc import ABC, abstractmethod
from typing import Iterable, Optional

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db.models import QuerySet

from api.internal.user.db.models import Order, Transaction, TransactionTypes


class ITransactionRepository(ABC):
    @abstractmethod
    def declare(
        self,
        source_id: int,
        destination_id: Optional[int],
        typeof: TransactionTypes,
        accrual: int = 0,
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
        accrual: int = 0,
        description: Optional[str] = None,
        order: Optional[Order] = None,
    ) -> QuerySet[Transaction]:
        ...

    @abstractmethod
    def get_history(self, user_id: int) -> QuerySet[Transaction]:
        ...

    @abstractmethod
    def attach_files(self, activity: Transaction, files: Iterable[InMemoryUploadedFile]) -> None:
        ...
