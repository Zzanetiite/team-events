from django.contrib.auth.models import User
from django.db import models

from events.models.event import Event
from events.models.rating_type import RatingType


class Rating(models.Model):
    id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating_type = models.ForeignKey(RatingType, on_delete=models.CASCADE)
    score = models.IntegerField()

    class Meta:
        # Ensures user can vote once per event
        unique_together = ("event", "user", "rating_type")

    def __str__(self):
        return f"{self.event.title} - {self.rating_type.name} - {self.score}"
