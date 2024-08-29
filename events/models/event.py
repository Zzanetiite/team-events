import json

from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models

from events.models.event_type import EventType


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
    address = models.CharField(max_length=255)

    def get_event(self):
        event_data = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "average_rating_event": self.average_rating_event,
            "average_rating_loudness": self.average_rating_loudness,
            "user": self.user.username,
            "event_type": self.event_type.name,
            "address": self.address,
        }
        return json.dumps(event_data, cls=DjangoJSONEncoder)

    def __str__(self):
        return self.title
