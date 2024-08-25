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
    event_type = serializers.CharField(required=False)  # Accept name as string

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "event_type",
            "description",
            "average_rating_event",
            "user",
            "address",
        ]
        read_only_fields = ["average_rating_event", "user"]

    def validate_event_type(self, value):
        """
        Required because the default method doesn't resolve the EventType by name.
        """
        if isinstance(value, str):
            try:
                return EventType.objects.get(name=value)
            except EventType.DoesNotExist:
                raise serializers.ValidationError("Invalid event type name.")
        elif isinstance(value, int):
            try:
                return EventType.objects.get(id=value)
            except EventType.DoesNotExist:
                raise serializers.ValidationError("Invalid event type ID.")
        raise serializers.ValidationError("Event type must be a valid ID or name.")

    def create(self, validated_data):
        return super().create(validated_data)
