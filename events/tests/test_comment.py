from django.urls import reverse
from rest_framework import status

from events.models.comment import Comment
from events.tests.base_test_case import BaseTestCase
from events.tests.create_test_data import initialize_test_data


class CommentCreateViewTest(BaseTestCase):

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
