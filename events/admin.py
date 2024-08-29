from django.contrib import admin

from events.models.event import Event
from events.models.event_type import EventType
from events.models.rating import Rating
from events.models.rating_type import RatingType


@admin.register(EventType)
class EventTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("id", "description", "average_rating_event", "user", "event_type")


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ("event", "user", "rating_type", "score")


@admin.register(RatingType)
class RatingTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
