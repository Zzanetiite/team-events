from django.urls import reverse
from rest_framework import status

from events.models.event import Event
from events.serializers import EventSerializer
from events.tests.base_test_case import BaseTestCase
from events.tests.create_test_data import initialize_test_data


class EventByTypeViewTests(BaseTestCase):
    def setUp(self):
        data = initialize_test_data()
        self.user = data["user"]
        self.admin_user = data["admin_user"]
        self.user1 = data["user1"]
        self.user2 = data["user2"]
        self.event_type = data["event_type"]
        self.event_type_2 = data["event_type_2"]
        self.location = data["location"]
        self.event = data["event"]

        self.client.login(username="testuser", password="password")

        event_type_names = f"{self.event_type.name},{self.event_type_2.name}"

        self.url = reverse(
            "events_by_type_names",
            kwargs={"event_type_names": event_type_names},
        )

    def test_get_events_by_type(self):
        response = self.client.get(self.url)
        events = Event.objects.filter(
            event_type__name__in=[self.event_type.name, self.event_type_2.name]
        )
        serializer = EventSerializer(events, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
