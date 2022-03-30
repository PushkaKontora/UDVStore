from django.db import models
from .Transactions import Transactions
from api.internal.services import generate_new_file_name


class FilesForTransactions(models.Model):
    transaction = models.ForeignKey(
        Transactions, on_delete=models.PROTECT,
        related_name='files'
    )
    filename = models.FileField(upload_to=generate_new_file_name)
