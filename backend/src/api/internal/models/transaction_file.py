from django.db import models

from api.internal.models.transaction import Transaction


class TransactionFile(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.PROTECT, related_name="files")
    filename = models.FileField(upload_to="transaction_files")

    class Meta:
        db_table = "transaction_files"
        verbose_name = "Transaction File"
        verbose_name_plural = "Transaction Files"
