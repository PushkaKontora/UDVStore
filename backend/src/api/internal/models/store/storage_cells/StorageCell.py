from django.core.validators import MinValueValidator
from django.db import models

from api.internal.models.store.Product import Product
from api.internal.models.store.storage_cells.SizeChoices import SizeChoices


class StorageCell(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE,
        related_name="cells_in_storage"
    )

    amount = models.BigIntegerField(
        validators=[MinValueValidator(0)]
    )
    size = models.IntegerField(
        choices=SizeChoices.choices,
        default=SizeChoices.M)

    class Meta:
        db_table = "storage_cells"
        verbose_name = "Storage Cell"
        verbose_name_plural = "Storage Cells"
