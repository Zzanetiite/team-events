import json
from unittest.mock import MagicMock, mock_open, patch

from django.db import IntegrityError
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from events.utils import Utils


class UtilsTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    @patch("events.utils.render")
    def test_index(self, mock_render):
        mock_render.return_value = "mocked_rendered_response"
        mock_request = MagicMock()
        response = Utils.index(mock_request)
        # Assert
        mock_render.assert_called_once_with(mock_request, "index.html")
        self.assertEqual(response, "mocked_rendered_response")

    @patch("events.utils.JsonResponse")
    def test_get_csrf_token(self, MockJsonResponse):
        mock_response = MockJsonResponse.return_value
        mock_response.status_code = 200
        mock_response.content = b'{"success": "CSRF cookie set"}'
        mock_request = MagicMock()
        response = Utils.get_csrf_token(mock_request)
        # Assert
        MockJsonResponse.assert_called_once_with({"success": "CSRF cookie set"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'{"success": "CSRF cookie set"}')

    @patch("events.utils.os.path.exists")
    @patch(
        "events.utils.open",
        new_callable=mock_open,
        read_data='{"files": {"test_file": "test_file_path"}}',
    )
    def test_get_manifest(self, mock_open, mock_exists):
        mock_exists.return_value = True
        result = Utils.get_manifest("test_file")
        self.assertEqual(result, "test_file_path")

        result = Utils.get_manifest("nonexistent_file")
        self.assertEqual(result, "nonexistent_file")

    @patch("events.utils.JsonResponse")
    def test_validate_admin_page_password_correct(self, MockJsonResponse):
        mock_correct_response = MockJsonResponse.return_value
        mock_correct_response.status_code = status.HTTP_200_OK
        mock_correct_response.content = b'{"message": "Success. Password correct."}'

        correct_response = Utils.validate_admin_page_password("correct_password")
        self.assertEqual(correct_response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            json.loads(correct_response.content.decode("utf-8")),
            {"message": "Success. Password correct."},
        )

    @patch("events.utils.JsonResponse")
    def test_validate_admin_page_password_wrong(self, MockJsonResponse):
        mock_incorrect_response = MockJsonResponse.return_value
        mock_incorrect_response.status_code = 403
        mock_incorrect_response.content = (
            b'{"status": "error", "message": "Invalid password"}'
        )

        incorrect_response = Utils.validate_admin_page_password("wrong_password")
        self.assertEqual(incorrect_response.status_code, 403)
        self.assertEqual(
            json.loads(incorrect_response.content.decode("utf-8")),
            {"status": "error", "message": "Invalid password"},
        )

    @patch("events.utils.User")
    def test_create_user_internal(self, MockUser):
        mock_user = MagicMock()
        MockUser.objects.create_user = MagicMock(return_value=mock_user)
        MockUser.objects.create_superuser = MagicMock(return_value=mock_user)

        # Test creating a regular user
        response = Utils.create_user_internal("username", "password")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, {"success": "User created successfully."})

        # Test creating a superuser
        response = Utils.create_user_internal("username", "password", is_superuser=True)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, {"success": "Admin user created successfully."})

        # Test when user already exists
        MockUser.objects.create_user.side_effect = IntegrityError("User already exists")
        response = Utils.create_user_internal("username", "password")
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(response.data, {"error": "Username already exists."})

        # Test when an unexpected error occurs
        MockUser.objects.create_user.side_effect = Exception("Unexpected error")
        response = Utils.create_user_internal("username", "password")
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data, {"error": "Unexpected error"})
