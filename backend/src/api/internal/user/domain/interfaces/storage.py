from abc import ABC, abstractmethod


class IStorageRepository(ABC):
    @abstractmethod
    def is_enough_amount(self, cell_id: int, amount: int) -> bool:
        ...
