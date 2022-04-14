from django.db import models


class StatusChoices(models.IntegerChoices):
    NEW = 0
    IN_PROCESS = 1
    DONE = 2
