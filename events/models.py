from django.db import models


class Counter(models.Model):
    value = models.IntegerField(default=0)

    def __str__(self) -> str:
        return str(self.value)
