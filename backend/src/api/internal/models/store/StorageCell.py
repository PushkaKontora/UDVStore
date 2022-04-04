from django.core.validators import MinValueValidator
from django.db import models

from .Product import Product


class SizeChoices(models.IntegerChoices):
    XS = 1
    S = 2
    M = 3
    L = 4
    XL = 5
    XXL = 6
    XXXL = 7


class StorageCell(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE,
        related_name="cells_in_storage"
    )
    amount = models.BigIntegerField(
        validators=[MinValueValidator(0)]
    )

    # свойства товаров
    size = models.IntegerField(
        choices=SizeChoices.choices,
        default=SizeChoices.M)

    class Meta:
        db_table = "storage_cells"
        verbose_name = "Storage Cell"
        verbose_name_plural = "Storage Cells"
