from django.contrib.auth.models import User
from django.db import models

from events.models.event_type import EventType
from events.models.location import Location


class Event(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=40)
    event_type = models.ForeignKey(
        EventType, on_delete=models.SET_NULL, null=True, blank=True
    )
    description = models.CharField(max_length=255)
    average_rating_event = models.IntegerField(null=True, blank=True)
    average_rating_loudness = models.IntegerField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return self.title
