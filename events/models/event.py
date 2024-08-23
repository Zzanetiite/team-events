import json

from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models

from events.models.eventType import EventType

# TODO: CLean up by deleting the origincal models file


class Event(models.Model):
    # TODO: Location ID
    # TODO: CommentsList ID
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=40)
    event_type = models.ForeignKey(
        EventType, on_delete=models.SET_NULL, null=True, blank=True
    )
    description = models.CharField(max_length=40)
    average_rating_event = models.IntegerField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def get_event(self):
        event_data = {
            "is": self.id,
            "description": self.description,
            "average_rating_event": self.average_rating_event,
            "user": self.user.username,
            "event_type": self.event_type.name,
        }
        return json.dumps(event_data, cls=DjangoJSONEncoder)

    def __str__(self):
        return self.title
