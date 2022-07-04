from api.internal.user.db.models import StorageCell
from api.internal.user.domain.interfaces import IStorageRepository


class StorageRepository(IStorageRepository):
    def is_enough_amount(self, cell_id: int, amount: int) -> bool:
        cell = StorageCell.objects.filter(id=cell_id).first()
        if not cell:
            raise ValueError("Unknown cell_id")

        return amount <= cell.amount
