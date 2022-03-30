from django.db import models
from django.core.validators import MinValueValidator

from src.api.internal import generate_new_file_name


class Products(models.Model):
    name = models.CharField(max_length=128)
    photo = models.ImageField(upload_to=generate_new_file_name)
    description = models.CharField(max_length=5000)
    price = models.FloatField(validators=[MinValueValidator(0)])

