from django.core.validators import MinValueValidator
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=128)
    photo = models.ImageField(upload_to="products")
    description = models.CharField(max_length=5000, blank=True, null=True, default=None)
    price = models.IntegerField(validators=[MinValueValidator(0)])

    class Meta:
        db_table = "products"
        verbose_name = "Product"
        verbose_name_plural = "Products"
