from django.core.validators import MinValueValidator
from django.db import models

from .StorageCells import StorageCells
from .Transactions import Transactions


class StatusChoices(models.IntegerChoices):
    NEW = 0
    DELIVER = 1
    IN_PROCESS = 2
    DONE = 3


class Order(models.Model):
    status = models.IntegerField(
        choices=StatusChoices.choices,
        default=StatusChoices.NEW
    )
    amount = models.BigIntegerField(
        validators=[MinValueValidator(0)]
    )

    # ! product_id есть в storage
    # product = models.ForeignKey(
    #     Products, on_delete=models.PROTECT,
    #     default=None,
    #     related_name="related_orders"
    # )
    transaction = models.ForeignKey(
        Transactions, on_delete=models.PROTECT,
        related_name="related_orders"
    )
    storage_cell = models.ManyToManyField(
        StorageCells,
        related_name="related_orders"
    )
