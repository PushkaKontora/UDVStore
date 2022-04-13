from django.core.validators import MinValueValidator
from django.db import models

from api.internal.models.store.storage_cells.StorageCell import StorageCell
from api.internal.models.store.order.StatusChoices import StatusChoices
from api.internal.models.profile import Profile


class Order(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.PROTECT)
    status = models.IntegerField(choices=StatusChoices.choices, default=StatusChoices.NEW)
    storage_cells = models.ManyToManyField(StorageCell, related_name="related_orders")
    amount = models.BigIntegerField(validators=[MinValueValidator(0)])
    in_cart = models.BooleanField(default=True)

    class Meta:
        db_table = "orders"
        verbose_name = "Order"
        verbose_name_plural = "Orders"
