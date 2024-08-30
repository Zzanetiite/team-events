from django.contrib.auth.models import User
from django.db import models

from events.models.event import Event


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.TextField(max_length=500, null=True, blank=False)
    event = models.ForeignKey(Event, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment
