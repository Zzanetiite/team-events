from django.contrib.auth.models import User
from rest_framework.test import APITestCase

from events.models.event import Event, EventType
from events.models.location import Location
from events.models.rating_type import RatingType


class BaseTestCase(APITestCase):
    def tearDown(self):
        Event.objects.all().delete()
        EventType.objects.all().delete()
        Location.objects.all().delete()
        RatingType.objects.all().delete()
        User.objects.all().delete()

        # Assertions to verify that tables are empty
        assert Event.objects.count() == 0, "Events not fully deleted"
        assert EventType.objects.count() == 0, "EventTypes not fully deleted"
        assert Location.objects.count() == 0, "Locations not fully deleted"
        assert RatingType.objects.count() == 0, "RatingTypes not fully deleted"
        assert User.objects.count() == 0, "Users not fully deleted"
