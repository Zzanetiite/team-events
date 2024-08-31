from django.contrib import admin

from events.models.comment import Comment
from events.models.event import Event
from events.models.event_type import EventType
from events.models.location import Location
from events.models.rating import Rating
from events.models.rating_type import RatingType


@admin.register(EventType)
class EventTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "description",
        "user",
        "event_type",
        "average_rating_event",
        "location",
    )


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ("event", "user", "rating_type", "score")


@admin.register(RatingType)
class RatingTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "comment", "event", "user", "date_created")


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ("address", "lat", "lng")
