from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from events.models.event import Event
from events.models.rating import Rating
from events.models.rating_type import RatingType


class RatingViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="password")
        self.client.login(username="testuser", password="password")

        self.user2 = User.objects.create_user(username="testuser2", password="password")
        self.user3 = User.objects.create_user(username="testuser3", password="password")

        self.event = Event.objects.create(
            title="Sample Event", description="This is a sample event", user=self.user
        )
        self.rating_type_event = RatingType.objects.create(name="Event")
        self.rating_type_loudness = RatingType.objects.create(name="Loudness")

        self.url = reverse("rating-list")

    def test_create_rating(self):
        data = {
            "event": self.event.id,
            "user": self.user.id,
            "rating_type": self.rating_type_event.id,
            "score": 5,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Rating.objects.count(), 1)
        self.assertEqual(Rating.objects.get().score, 5)

    def test_update_existing_rating(self):
        data = {
            "event": self.event.id,
            "user": self.user.id,
            "rating_type": self.rating_type_event.id,
            "score": 4,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Rating.objects.count(), 1)
        self.assertEqual(Rating.objects.get().score, 4)

    def test_average_rating_update(self):
        Rating.objects.create(
            event=self.event,
            user=self.user2,
            rating_type=self.rating_type_event,
            score=5,
        )
        Rating.objects.create(
            event=self.event,
            user=self.user3,
            rating_type=self.rating_type_loudness,
            score=3,
        )
        data = {
            "event": self.event.id,
            "user": self.user.id,
            "rating_type": self.rating_type_event.id,
            "score": 4,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.event.refresh_from_db()
        self.assertEqual(self.event.average_rating_event, 4)
        self.assertEqual(self.event.average_rating_loudness, 3)
