from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from events.models.comment import Comment
from events.models.event import Event, EventType
from events.models.rating_type import RatingType


class CommentCreateViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
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

        RatingType.objects.create(name="Loudness Rating")
        RatingType.objects.create(name="Place Rating")

        self.url = reverse("comment-create")

    def test_create_comment(self):
        data = {
            "event": self.event.id,
            "comment": "This is a test comment.",
            "user": self.user.id,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)

        response_data = response.json()
        self.assertEqual(response_data["comment"], "This is a test comment.")
        self.assertEqual(response_data["event"], self.event.id)
        self.assertEqual(response_data["user"], self.user.username)
        self.assertIn("date_created", response_data)

    def test_create_comment_invalid_event(self):
        data = {
            "event": 999,
            "comment": "This is a test comment.",
            "user": self.user.id,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Comment.objects.count(), 0)

    def test_create_comment_missing_data(self):
        data = {"event": self.event.id}
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Comment.objects.count(), 0)
