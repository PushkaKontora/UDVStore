from django.conf import settings
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    patronymic = models.CharField(max_length=256, default="", blank=True)
    balance = models.DecimalField(
        max_digits=settings.COINS_AMOUNT_DIGITS,
        decimal_places=settings.COINS_DECIMAL_PLACES,
        validators=[MinValueValidator(0)],
        default=0,
    )
    photo = models.ImageField(upload_to="profile", null=True)

    class Meta:
        db_table = "profiles"
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
