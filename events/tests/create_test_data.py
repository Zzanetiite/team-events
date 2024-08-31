from django.contrib.auth.models import User

from events.models.event import Event, EventType
from events.models.location import Location
from events.models.rating_type import RatingType


def initialize_test_data():
    user = User.objects.create_user(username="testuser", password="password")
    admin_user = User.objects.create_superuser(
        username="adminuser", password="adminpassword"
    )
    user1 = User.objects.create_user(username="user1", password="otherpassword")

    user2 = User.objects.create_user(username="user2", password="otherpassword")

    event_type = EventType.objects.create(
        name="Restaurant", description="Glamorous Restaurant"
    )

    event_type_2 = EventType.objects.create(name="Fast Food", description="Fast Food")

    location = Location.objects.create(address="Sample Address", lat=1.0, lng=1.0)

    event = Event.objects.create(
        title="Sample Event",
        description="This is a sample event",
        average_rating_event=5,
        user=user,
        event_type=event_type,
        location=location,
    )

    rating_loudness = RatingType.objects.create(name="Loudness Rating")
    rating_place = RatingType.objects.create(name="Place Rating")

    return {
        "user": user,
        "admin_user": admin_user,
        "user1": user1,
        "user2": user2,
        "event_type": event_type,
        "event_type_2": event_type_2,
        "location": location,
        "event": event,
        "rating_loudness": rating_loudness,
        "rating_place": rating_place,
    }
