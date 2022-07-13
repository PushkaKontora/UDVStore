from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import IntegerChoices

from api.internal.models.order import Order
from api.internal.models.profile import Profile


class TransactionTypes(IntegerChoices):
    BUYING = 1  # покупка
    DEPOSIT = 2  # начисление коинов от админа, подтвержение активности
    COIN_GIFTING = 3  # дарение коинов
    REQUEST = 4  # прошение об активности
    CANCELED = 5
    APPROVED = 6


class Transaction(models.Model):
    DESCRIPTION_LENGTH = 2048

    type = models.IntegerField(choices=TransactionTypes.choices, default=TransactionTypes.BUYING)
    source = models.ForeignKey(Profile, on_delete=models.PROTECT, null=True)
    destination = models.ForeignKey(
        Profile, on_delete=models.PROTECT, default=None, null=True, related_name="transactions_to_me"
    )
    accrual = models.DecimalField(
        max_digits=settings.COINS_AMOUNT_DIGITS,
        decimal_places=settings.COINS_DECIMAL_PLACES,
        default=0,
        validators=[MinValueValidator(0)],
    )
    order = models.OneToOneField(Order, null=True, on_delete=models.PROTECT)
    description = models.CharField(max_length=DESCRIPTION_LENGTH, default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now=True)

    response = models.OneToOneField("self", null=True, on_delete=models.PROTECT, related_name="request")

    class Meta:
        db_table = "transactions"
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
