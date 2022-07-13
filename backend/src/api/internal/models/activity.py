from django.conf import settings
from django.db import models


class Activity(models.Model):
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=settings.COINS_AMOUNT_DIGITS, decimal_places=settings.COINS_DECIMAL_PLACES)

    class Meta:
        db_table = "activities"
