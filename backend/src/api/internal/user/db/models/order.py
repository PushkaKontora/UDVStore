from django.core.validators import MinValueValidator
from django.db import models
from djoser.conf import User

from api.internal.user.db.models.status_choices import StatusChoices
from api.internal.user.db.models.storage_cell import StorageCell


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    status = models.IntegerField(choices=StatusChoices.choices, default=StatusChoices.NEW)
    storage_cell = models.ForeignKey(StorageCell, related_name="related_orders", on_delete=models.PROTECT)
    amount = models.BigIntegerField(validators=[MinValueValidator(0)])
    in_cart = models.BooleanField(default=True)

    class Meta:
        db_table = "orders"
        verbose_name = "Order"
        verbose_name_plural = "Orders"
