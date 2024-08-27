from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from events.models.event import Event, EventType
from events.serializers import EventSerializer


class EventViewSetTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.admin_user = User.objects.create_superuser(
            username="adminuser", password="adminpassword"
        )
        self.client.login(username="testuser", password="password")
        self.event_type = EventType.objects.create(
            name="Restaurant", description="A large conference"
        )
        self.event = Event.objects.create(
            title="Sample Event",
            description="This is a sample event",
            average_rating_event=5,
            user=self.user,
            event_type=self.event_type,
        )
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
            "average_rating_event": 4,
            "event_type": self.event_type.name,
            "address": "123 Main St",
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

    def test_delete_event_by_non_admin(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Event.objects.count(), 1)

    def test_delete_event_by_admin(self):
        self.client.login(username="adminuser", password="adminpassword")
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Event.objects.count(), 0)


class EventByUsernameViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.client.login(username="testuser", password="password")
        self.event_type = EventType.objects.create(
            name="Workshop", description="A practical workshop"
        )
        self.event = Event.objects.create(
            title="Event by User",
            description="Event created by a specific user",
            average_rating_event=3,
            user=self.user,
            event_type=self.event_type,
        )
        self.url = reverse(
            "events-by-username", kwargs={"username": self.user.username}
        )

    def test_get_events_by_username(self):
        response = self.client.get(self.url)
        events = Event.objects.filter(user=self.user)
        serializer = EventSerializer(events, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)


class EventByTypeViewTests(APITestCase):
    def setUp(self):
        self.event_type = EventType.objects.create(
            name="Seminar", description="Educational seminar"
        )
        self.other_event_type = EventType.objects.create(
            name="Social", description="Social event"
        )
        self.event = Event.objects.create(
            title="Event by Type",
            description="Event of a specific type",
            average_rating_event=2,
            event_type=self.event_type,
            user=User.objects.create_user(username="anotheruser", password="password"),
        )
        self.url = reverse(
            "events-by-type", kwargs={"event_type_id": self.event_type.id}
        )

    def test_get_events_by_type(self):
        response = self.client.get(self.url)
        events = Event.objects.filter(event_type=self.event_type)
        serializer = EventSerializer(events, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)


class LatestEventsViewTests(APITestCase):
    def setUp(self):
        self.event_type = EventType.objects.create(
            name="Concert", description="Live music event"
        )
        for i in range(15):  # Creating more than 10 events to test the latest
            Event.objects.create(
                title=f"Event {i}",
                description=f"Description {i}",
                average_rating_event=i % 5,
                user=User.objects.create_user(username=f"user{i}", password="password"),
                event_type=self.event_type,
            )
        self.url = reverse("latest-events")

    def test_get_latest_events(self):
        response = self.client.get(self.url)
        events = Event.objects.order_by("-id")[:10]
        serializer = EventSerializer(events, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
