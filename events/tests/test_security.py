from unittest.mock import patch

from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APITestCase


class SecurityViewTests(APITestCase):

    def setUp(self):
        self.username = "testuser"
        self.password = "testpassword"
        self.user = User.objects.create_user(
            username=self.username, password=self.password
        )

        self.get_csrf_url = "/api/security/get-csrf-token/"
        self.validate_password_url = "/api/security/validate-admin-password/"

        self.correct_password = "correct_password"
        self.incorrect_password = "incorrect_password"

        self.original_password = settings.ADMIN_CREATE_PAGE_PASSWORD
        settings.ADMIN_CREATE_PAGE_PASSWORD = self.correct_password

    def tearDown(self):
        settings.ADMIN_CREATE_PAGE_PASSWORD = self.original_password

    @patch("events.utils.Utils.get_csrf_token")
    def test_get_csrf_token(self, mock_get_csrf_token):
        mock_get_csrf_token.return_value = Response(
            {"success": "CSRF cookie set"}, status=status.HTTP_200_OK
        )

        response = self.client.get(self.get_csrf_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"success": "CSRF cookie set"})

    def test_get_invalid_action(self):
        response = self.client.get("/api/security/invalid-action/")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Invalid action"})

    @patch("events.utils.Utils.validate_admin_page_password")
    def test_post_validate_admin_password_correct(self, mock_validate_admin_password):
        mock_validate_admin_password.return_value = Response(
            {"message": "Success. Password correct."}, status=status.HTTP_200_OK
        )

        response = self.client.post(
            self.validate_password_url,
            {"password": self.correct_password},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"message": "Success. Password correct."})

    @patch("events.utils.Utils.validate_admin_page_password")
    def test_post_validate_admin_password_incorrect(self, mock_validate_admin_password):
        mock_validate_admin_password.return_value = Response(
            {"status": "error", "message": "Invalid password"},
            status=status.HTTP_403_FORBIDDEN,
        )

        response = self.client.post(
            self.validate_password_url,
            {"password": self.incorrect_password},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(
            response.data, {"status": "error", "message": "Invalid password"}
        )

    def test_post_invalid_action(self):
        response = self.client.post(
            "/api/security/invalid-action/",
            {"password": self.correct_password},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Invalid action"})
