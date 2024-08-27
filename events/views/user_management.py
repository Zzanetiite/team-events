from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.serializers import CharField, Serializer
from rest_framework.views import APIView

from team_events.settings import ADMIN_CREATE_PAGE_PASSWORD

from ..utils import Utils


class AuthTokenSerializer(Serializer):
    username = CharField(required=True)
    password = CharField(required=True)


class UserManagementView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, action):
        if action == "create-user":
            username = request.data.get("username")
            password = request.data.get("password")
            return Utils.create_user_internal(username, password)

        # TODO: Add secret password check to the request
        elif action == "create-admin":
            username = request.data.get("username")
            password = request.data.get("password")
            email = request.data.get("email")
            secret_admin_password = request.data.get("secret_admin_password")
            if secret_admin_password != ADMIN_CREATE_PAGE_PASSWORD:
                return Response(
                    {"error": "Invalid secret admin password"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            return Utils.create_user_internal(
                username, password, email, is_superuser=True
            )

        elif action == "login":
            serializer = AuthTokenSerializer(data=request.data)
            if serializer.is_valid():
                username = serializer.validated_data["username"]
                password = serializer.validated_data["password"]
                user = authenticate(username=username, password=password)
                if user is not None:
                    token, created = Token.objects.get_or_create(user=user)
                    return Response({"token": token.key}, status=status.HTTP_200_OK)
                else:
                    return Response(
                        {"error": "Invalid credentials"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif action == "logout":
            if request.user.is_authenticated:
                try:
                    token = Token.objects.get(user=request.user)
                    token.delete()
                    return Response(
                        {"message": "Successfully logged out."},
                        status=status.HTTP_200_OK,
                    )
                except Token.DoesNotExist:
                    return Response(
                        {"error": "Token not found."}, status=status.HTTP_404_NOT_FOUND
                    )
            else:
                return Response(
                    {"error": "User is not authenticated."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, action=None):
        if action == "get-username":
            if request.user.is_authenticated:
                return Response(
                    {
                        "username": request.user.username,
                        "is_admin": request.user.is_superuser,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "User is not authenticated."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
