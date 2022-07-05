from itertools import chain
from typing import List, Optional

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import IntegrityError
from django.db.models import QuerySet
from django.db.transaction import atomic
from django.utils.datastructures import MultiValueDict
from djoser.conf import User

from api.internal.user.db.models import Transaction, TransactionTypes
from api.internal.user.domain.interfaces import ITransactionRepository


class TransactionService:
    def __init__(self, transaction_repo: ITransactionRepository):
        self._transaction_repo = transaction_repo

    def get_history(self, user: User) -> QuerySet[Transaction]:
        return self._transaction_repo.get_history(user.id)

    def try_create_activity(
        self, user: User, description: str, files: MultiValueDict[str, List[InMemoryUploadedFile]]
    ) -> bool:
        try:
            with atomic():
                activity = self._transaction_repo.declare(
                    source_id=user.id, destination_id=None, typeof=TransactionTypes.REQUEST, description=description
                )
                self._transaction_repo.attach_files(activity, chain(files.values()))

                return True
        except IntegrityError:
            return False
