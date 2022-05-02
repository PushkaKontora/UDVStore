from django.db.models import IntegerChoices


class TransactionTypes(IntegerChoices):
    BUYING = 1  # покупка
    DEPOSIT = 2  # начисление коинов от админа, подтвержение активности
    COIN_GIFTING = 3  # дарение коинов
    REQUEST = 4  # прошение об активности
    CANCELED = 5
    APPROVED = 6
