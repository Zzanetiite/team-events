from django.contrib import admin

from events.models.counter import Counter
from events.models.event import Event
from events.models.eventType import EventType


@admin.register(Counter)
class CounterAdmin(admin.ModelAdmin):
    list_filter = ["value"]


@admin.register(EventType)
class EventTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("id", "description", "average_rating_event", "user", "event_type")
