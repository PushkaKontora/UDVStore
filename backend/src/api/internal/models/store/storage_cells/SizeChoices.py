from django.db import models


class SizeChoices(models.IntegerChoices):
    NONE = 0
    XS = 1
    S = 2
    M = 3
    L = 4
    XL = 5
    XXL = 6
    XXXL = 7
