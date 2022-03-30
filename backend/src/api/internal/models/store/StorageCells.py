from django.core.validators import MinValueValidator
from django.db import models

from .Products import Products


class SizeChoices(models.IntegerChoices):
    XS = 1
    S = 2
    M = 3
    L = 4
    XL = 5
    XXL = 6
    XXXL = 7


class StorageCells(models.Model):
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE,
        related_name="cells_in_storage"
    )
    amount = models.BigIntegerField(
        validators=[MinValueValidator(0)]
    )

    # свойства товаров
    size = models.IntegerField(
        choices=SizeChoices.choices,
        default=SizeChoices.M)
