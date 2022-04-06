from django.db import models


class StatusChoices(models.IntegerChoices):
    NEW = 0
    DELIVER = 1
    IN_PROCESS = 2
    DONE = 3
