from django.contrib.auth.models import User
from django.contrib.gis.geos import Point
from django.urls import reverse
from rest_framework import status

from events.models.event import Event, EventType
from events.models.location import Location
from events.tests.base_test_case import BaseTestCase


class NearbyEventsViewTests(BaseTestCase):
    def setUp(self):
        self.event_type = EventType.objects.create(
            name="Meetup", description="Social event"
        )

        # Nearby location (within 10km)
        self.location_near = Location.objects.create(
            address="Nearby Place", coordinates=Point(24.941, 60.171)
        )
        self.event_near = Event.objects.create(
            title="Nearby Event",
            description="Close to user",
            average_rating_event=4,
            user=User.objects.create_user(username="nearby", password="password"),
            event_type=self.event_type,
            location=self.location_near,
        )

        # Far location (outside 10km)
        self.location_far = Location.objects.create(
            address="Far Place", coordinates=Point(25.5, 60.5)
        )
        self.event_far = Event.objects.create(
            title="Far Event",
            description="Far from user",
            average_rating_event=3,
            user=User.objects.create_user(username="far", password="password"),
            event_type=self.event_type,
            location=self.location_far,
        )

        self.url = reverse("nearby-events")
        self.user_location = {"lat": 60.1708, "lng": 24.9375}  # Helsinki center

    def test_get_nearby_events_within_radius(self):
        response = self.client.get(
            self.url,
            {
                "lat": self.user_location["lat"],
                "lng": self.user_location["lng"],
                "radius_km": 10,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], self.event_near.title)

    def test_get_no_events_outside_radius(self):
        response = self.client.get(
            self.url,
            {
                "lat": self.user_location["lat"],
                "lng": self.user_location["lng"],
                "radius_km": 0.1,  # Very small radius
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_invalid_parameters(self):
        response = self.client.get(
            self.url, {"lat": "not-a-float", "lng": "also-not", "radius_km": "abc"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_parameters(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
