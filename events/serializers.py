from django.contrib.auth.models import User
from rest_framework import serializers

from events.models.event import Event
from events.models.event_type import EventType
from events.models.rating import Rating
from events.models.rating_type import RatingType


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
    user = serializers.SerializerMethodField()
    users_rating_event = serializers.SerializerMethodField()
    users_rating_loudness = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "event_type",
            "description",
            "user",
            "address",
            "average_rating_event",
            "average_rating_loudness",
            "users_rating_event",
            "users_rating_loudness",
        ]
        read_only_fields = [
            "average_rating_event",
            "average_rating_loudness",
            "users_rating_event",
            "users_rating_loudness",
            "user",
        ]

    def get_user(self, obj):
        return obj.user.username

    def get_users_rating_event(self, obj):
        request = self.context.get("request", None)
        if request and request.user.is_authenticated:
            user = request.user
            rating_type_event = RatingType.objects.get(name="Place Rating")
            try:
                rating = Rating.objects.get(
                    event=obj, user=user, rating_type=rating_type_event
                )
                return rating.score
            except Rating.DoesNotExist:
                return None
        return None

    def get_users_rating_loudness(self, obj):
        request = self.context.get("request", None)
        if request and request.user.is_authenticated:
            user = request.user
            rating_type_loudness = RatingType.objects.get(name="Loudness Rating")
            try:
                rating = Rating.objects.get(
                    event=obj, user=user, rating_type=rating_type_loudness
                )
                return rating.score
            except Rating.DoesNotExist:
                return None
        return None

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


class RatingSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    rating_type = serializers.PrimaryKeyRelatedField(queryset=RatingType.objects.all())

    class Meta:
        model = Rating
        fields = ["id", "event", "user", "rating_type", "score"]

    def update(self, instance, validated_data):
        instance.score = validated_data.get("score", instance.score)
        instance.save()
        return instance
