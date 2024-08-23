from django.contrib.auth.models import User
from rest_framework import serializers

from events.models.counter import Counter
from events.models.event import Event
from events.models.eventType import EventType


class CounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Counter
        fields = ["id", "value"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ["id", "name"]


class EventSerializer(serializers.ModelSerializer):
    event_type = EventTypeSerializer(read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "event_type",
            "description",
            "average_rating_event",
            "user",
        ]
        read_only_fields = ["average_rating_event", "user"]
