from django.core.validators import MinValueValidator
from django.db import models

from api.internal.models.store.storage_cells.StorageCell import StorageCell
from api.internal.models.store.orders.StatusChoices import StatusChoices
from api.internal.models.store.transactions.Transaction import Transaction


class Order(models.Model):
    status = models.IntegerField(
        choices=StatusChoices.choices,
        default=StatusChoices.NEW
    )
    amount = models.BigIntegerField(
        validators=[MinValueValidator(0)]
    )
    transaction = models.ForeignKey(
        Transaction, on_delete=models.PROTECT,
        related_name="related_orders"
    )
    storage_cell = models.ManyToManyField(
        StorageCell,
        related_name="related_orders"
    )

    class Meta:
        db_table = "orders"
        verbose_name = "Order"
        verbose_name_plural = "Orders"
