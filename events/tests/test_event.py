from django.contrib.auth.models import User
from django.contrib.gis.geos import Point
from django.urls import reverse
from rest_framework import status

from events.models.event import Event, EventType
from events.models.location import Location
from events.models.rating_type import RatingType
from events.serializers import EventSerializer
from events.tests.base_test_case import BaseTestCase
from events.tests.create_test_data import initialize_test_data


class EventViewSetTests(BaseTestCase):
    def setUp(self):
        data = initialize_test_data()
        self.user = data["user"]
        self.admin_user = data["admin_user"]
        self.user1 = data["user1"]
        self.user2 = data["user2"]
        self.event_type = data["event_type"]
        self.location = data["location"]
        self.event = data["event"]

        self.client.login(username="testuser", password="password")

        self.url = reverse("event-list")
        self.detail_url = reverse("event-detail", kwargs={"pk": self.event.pk})

    def test_list_events(self):
        response = self.client.get(self.url)
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_retrieve_event(self):
        response = self.client.get(self.detail_url)
        serializer = EventSerializer(self.event)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_create_event(self):
        data = {
            "title": "New Event",
            "description": "Description of the new event",
            "event_type": self.event_type.name,
            "location": {"address": "123 Main St", "lat": 1.0, "lng": 1.0},
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 2)
        self.assertEqual(Event.objects.latest("id").title, "New Event")

    def test_update_event(self):
        data = {"title": "Updated Event"}
        response = self.client.patch(self.detail_url, data, format="json")
        self.event.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.event.title, "Updated Event")

    def test_delete_event_by_non_creator_non_admin(self):
        logged_in = self.client.login(username="user1", password="otherpassword")
        self.assertTrue(logged_in, "Login failed for 'user1'")
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Event.objects.count(), 1)

    def test_delete_event_by_creator(self):
        # Already logged in via setup()
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Event.objects.count(), 0)

    def test_delete_event_by_admin(self):
        self.client.login(username="adminuser", password="adminpassword")
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Event.objects.count(), 0)


class EventByUsernameViewTests(BaseTestCase):
    def setUp(self):
        data = initialize_test_data()
        self.user = data["user"]
        self.admin_user = data["admin_user"]
        self.user1 = data["user1"]
        self.user2 = data["user2"]
        self.event_type = data["event_type"]
        self.location = data["location"]
        self.event = data["event"]

        self.client.login(username="testuser", password="password")

        self.url = reverse(
            "events-by-username", kwargs={"username": self.user.username}
        )

    def test_get_events_by_username(self):
        response = self.client.get(self.url)
        events = Event.objects.filter(user=self.user)
        serializer = EventSerializer(events, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)


class LatestEventsViewTests(BaseTestCase):
    def setUp(self):
        self.event_type = EventType.objects.create(
            name="Concert", description="Live music event"
        )

        self.location = Location.objects.create(
            address="Sample Address", coordinates=Point(1.0, 2.0)
        )
        for i in range(15):  # Creating more than 10 events to test the latest
            Event.objects.create(
                title=f"Event {i}",
                description=f"Description {i}",
                average_rating_event=i % 5,
                user=User.objects.create_user(username=f"user{i}", password="password"),
                event_type=self.event_type,
                location=self.location,
            )

        RatingType.objects.create(name="Loudness Rating")
        RatingType.objects.create(name="Place Rating")

        self.url = reverse("latest-events")

    def test_get_latest_events(self):
        response = self.client.get(self.url)
        events = Event.objects.order_by("-id")[:10]
        serializer = EventSerializer(events, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
