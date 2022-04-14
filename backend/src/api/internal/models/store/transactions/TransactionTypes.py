from django.db.models import IntegerChoices


class TransactionTypes(IntegerChoices):
    BUYING = 1  # покупка
    DEPOSIT = 2  # начисление коинов
    COIN_GIFTING = 3  # дарение коинов
    