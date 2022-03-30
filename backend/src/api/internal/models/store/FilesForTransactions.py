from django.db import models

from api.internal.services.generate_new_file_name import generate_new_file_name

from .Transactions import Transactions


class FilesForTransactions(models.Model):
    transaction = models.ForeignKey(
        Transactions, on_delete=models.PROTECT,
        related_name='files'
    )
    filename = models.FileField(upload_to=generate_new_file_name)
