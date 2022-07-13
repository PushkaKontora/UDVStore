from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=128)
    photo = models.ImageField(upload_to="products")
    description = models.CharField(max_length=5000, blank=True, null=True, default=None)
    price = models.DecimalField(
        max_digits=settings.COINS_AMOUNT_DIGITS,
        decimal_places=settings.COINS_DECIMAL_PLACES,
        validators=[MinValueValidator(0)],
    )
    is_visible = models.BooleanField(default=True)

    class Meta:
        db_table = "products"
        verbose_name = "Product"
        verbose_name_plural = "Products"
