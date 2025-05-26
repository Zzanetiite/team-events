from django.contrib.auth.models import User
from django.contrib.gis.geos import Point
from rest_framework import serializers

from events.models.comment import Comment
from events.models.event import Event
from events.models.event_type import EventType
from events.models.location import Location
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


class CommentSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "comment", "event", "user", "date_created"]

    def get_user(self, obj):
        return obj.user.username


class LocationSerializer(serializers.ModelSerializer):
    lat = serializers.FloatField(write_only=True)
    lng = serializers.FloatField(write_only=True)
    # Include lat/lng as read-only fields by extracting from PointField
    latitude = serializers.SerializerMethodField(read_only=True)
    longitude = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Location
        fields = ["id", "address", "lat", "lng", "latitude", "longitude"]

    def get_latitude(self, obj):
        if obj.coordinates:
            return obj.coordinates.y  # latitude
        return None

    def get_longitude(self, obj):
        if obj.coordinates:
            return obj.coordinates.x  # longitude
        return None

    def create(self, validated_data):
        lat = validated_data.pop("lat")
        lng = validated_data.pop("lng")
        validated_data["coordinates"] = Point(lng, lat)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        lat = validated_data.pop("lat", None)
        lng = validated_data.pop("lng", None)
        if lat is not None and lng is not None:
            instance.coordinates = Point(lng, lat)
        return super().update(instance, validated_data)


class EventSerializer(serializers.ModelSerializer):
    event_type = serializers.CharField(required=False)  # Accept name as string
    user = serializers.SerializerMethodField()
    users_rating_event = serializers.SerializerMethodField()
    users_rating_loudness = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    location = LocationSerializer()

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "event_type",
            "description",
            "user",
            "location",
            "average_rating_event",
            "average_rating_loudness",
            "users_rating_event",
            "users_rating_loudness",
            "comments",
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
        location_data = validated_data.pop("location", None)
        event_type_data = validated_data.pop("event_type", None)

        if event_type_data:
            event_type, created = EventType.objects.get_or_create(name=event_type_data)

        if location_data:
            location, created = Location.objects.update_or_create(
                address=location_data.get("address"),
                defaults={
                    "coordinates": Point(
                        location_data.get("lng"), location_data.get("lat")
                    ),
                },
            )
        else:
            location = None

        event = Event.objects.create(
            **validated_data, location=location, event_type=event_type
        )
        return event

    def update(self, instance, validated_data):
        location_data = validated_data.pop("location", None)
        event_type_data = validated_data.pop("event_type", None)

        if event_type_data:
            event_type, created = EventType.objects.get_or_create(name=event_type_data)
            instance.event_type = event_type

        if location_data:
            location, created = Location.objects.update_or_create(
                address=location_data.get("address"),
                defaults={
                    "coordinates": Point(
                        location_data.get("lng"), location_data.get("lat")
                    ),
                },
            )
            instance.location = location

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
