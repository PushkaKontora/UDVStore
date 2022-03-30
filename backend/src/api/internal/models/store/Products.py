from django.core.validators import MinValueValidator
from django.db import models

from api.internal.services.generate_new_file_name import generate_new_file_name


class Products(models.Model):
    name = models.CharField(max_length=128)
    photo = models.ImageField(upload_to=generate_new_file_name)
    description = models.CharField(max_length=5000)
    price = models.FloatField(validators=[MinValueValidator(0)])
