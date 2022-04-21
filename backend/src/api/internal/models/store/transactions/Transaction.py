from django.core.validators import MinValueValidator
from django.db import models

from api.internal.models.profile.Profile import Profile
from api.internal.models.store import Order
from api.internal.models.store.transactions.TransactionTypes import TransactionTypes


class Transaction(models.Model):
    type = models.IntegerField(choices=TransactionTypes.choices, default=TransactionTypes.BUYING)
    source = models.ForeignKey(Profile, on_delete=models.PROTECT, null=True)
    destination = models.ForeignKey(
        Profile, on_delete=models.PROTECT,
        default=None, null=True,
        related_name='transactions_to_me'
    )
    accrual = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    order = models.OneToOneField(Order, null=True, on_delete=models.PROTECT)
    description = models.CharField(max_length=2048, default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("pk", )
        db_table = "transactions"
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
