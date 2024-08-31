from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from events.models.rating import Rating
from events.tests.create_test_data import initialize_test_data


class RatingViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()

        data = initialize_test_data()
        self.user = data["user"]
        self.admin_user = data["admin_user"]
        self.user1 = data["user1"]
        self.user2 = data["user2"]
        self.event_type = data["event_type"]
        self.location = data["location"]
        self.event = data["event"]
        self.rating_loudness = data["rating_loudness"]
        self.rating_place = data["rating_place"]

        self.client.login(username="testuser", password="password")

        self.url = reverse("rating-list")

    def test_create_rating(self):
        data = {
            "event": self.event.id,
            "user": self.user.id,
            "rating_type": self.rating_loudness.id,
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
            "rating_type": self.rating_loudness.id,
            "score": 4,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Rating.objects.count(), 1)
        self.assertEqual(Rating.objects.get().score, 4)

    def test_average_rating_update(self):
        Rating.objects.create(
            event=self.event,
            user=self.user1,
            rating_type=self.rating_place,
            score=5,
        )
        Rating.objects.create(
            event=self.event,
            user=self.user2,
            rating_type=self.rating_loudness,
            score=3,
        )
        data = {
            "event": self.event.id,
            "user": self.user.id,
            "rating_type": self.rating_place.id,
            "score": 4,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.event.refresh_from_db()
        self.assertEqual(self.event.average_rating_event, 4)
        self.assertEqual(self.event.average_rating_loudness, 3)
