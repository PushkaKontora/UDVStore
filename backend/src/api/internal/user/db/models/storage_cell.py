from django.core.validators import MinValueValidator
from django.db import models

from api.internal.models.store.Product import Product


class StorageCell(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="cells_in_storage")
    size = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    amount = models.BigIntegerField(validators=[MinValueValidator(0)])

    class Meta:
        db_table = "storage_cells"
        verbose_name = "Storage Cell"
        verbose_name_plural = "Storage Cells"
        unique_together = ["product", "size"]
