from django.db import models

from api.internal.models.profile.Profile import Profile


class TransactionType(models.IntegerChoices):
    BUYING = 1  # покупка
    DEPOSIT = 2  # начисление коинов
    COIN_GIFTING = 3  # дарение коинов


class Transaction(models.Model):
    type = models.IntegerField(choices=TransactionType.choices, default=TransactionType.BUYING)
    profile = models.OneToOneField(Profile, on_delete=models.PROTECT)
    destination_user = models.ForeignKey(
        Profile, on_delete=models.PROTECT,
        default=None, blank=True, null=True,
        related_name='transactions_to_me'
    )
    accrual = models.FloatField()
    description = models.CharField(max_length=2048)
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "transactions"
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
