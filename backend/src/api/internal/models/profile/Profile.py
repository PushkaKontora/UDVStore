from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MinValueValidator


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    patronymic = models.CharField(max_length=256, default=None, null=True, blank=True)
    balance = models.IntegerField(validators=[MinValueValidator(0)], default=0)

    class Meta:
        db_table = "profiles"
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
