from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class UserManagementViewTests(APITestCase):

    def setUp(self):
        self.username = "testuser"
        self.password = "testpassword"
        self.user = User.objects.create_user(
            username=self.username, password=self.password
        )
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.base_url = "/api/user/"

    def test_create_user(self):
        url = self.base_url + "create-user/"
        response = self.client.post(
            url, {"username": "newuser", "password": "newpassword"}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, {"success": "User created successfully."})

    def test_create_admin(self):
        url = self.base_url + "create-admin/"
        response = self.client.post(
            url,
            {
                "username": "adminuser",
                "password": "adminpassword",
                "email": "admin@example.com",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, {"success": "Admin user created successfully."})

    def test_login(self):
        url = self.base_url + "login/"
        response = self.client.post(
            url, {"username": self.username, "password": self.password}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)

    def test_logout(self):
        url = self.base_url + "logout/"
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"message": "Successfully logged out."})

    def test_get_username(self):
        url = self.base_url + "get-username/"
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"username": self.username, "is_admin": False})

    def test_invalid_action(self):
        url = self.base_url + "invalid-action/"
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Invalid action"})

    def test_login_invalid_credentials(self):
        url = self.base_url + "login/"
        response = self.client.post(
            url, {"username": self.username, "password": "wrongpassword"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Invalid credentials"})
