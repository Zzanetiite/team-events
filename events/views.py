import json
import os

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views import View
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework import status
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from team_events.settings import DOMAIN

from .models import Counter


# ===========================================================
# Utility functions and index
# ===========================================================
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"success": "CSRF cookie set"})


def get_manifest(file_name):
    manifest_path = os.path.join("events/", "asset-manifest.json")
    if os.path.exists(manifest_path):
        with open(manifest_path) as manifest_file:
            manifest = json.load(manifest_file)
            files = manifest.get("files", {})
            return files.get(file_name, file_name)
    return file_name


def global_settings(request):
    return {
        "DOMAIN": DOMAIN,
    }


def index(request):
    return render(request, "index.html")


def create_user_internal(username, password, email=None, is_superuser=False):
    """
    Utility function to create a user or superuser.

    :param username: The username for the new user.
    :param password: The password for the new user.
    :param email: The email for the new user (optional).
    :param is_superuser: Boolean indicating whether to create a superuser.
    :return: A Response object with success or error message.
    """
    if not username or not password:
        return Response(
            {"error": "Username and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        if is_superuser:
            User.objects.create_superuser(
                username=username, email=email, password=password
            )
            return Response(
                {"success": "Admin user created successfully."},
                status=status.HTTP_201_CREATED,
            )
        else:
            User.objects.create_user(username=username, password=password, email=email)
            return Response(
                {"success": "User created successfully."},
                status=status.HTTP_201_CREATED,
            )
    except IntegrityError:
        return Response(
            {"error": "Username already exists."}, status=status.HTTP_409_CONFLICT
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ===========================================================
# Views for models
# ===========================================================
class IncrementCounterView(View):

    def post(self, request, pk):
        counter = get_object_or_404(Counter, pk=pk)
        counter.value += 1
        counter.save()
        return JsonResponse({"value": counter.value})

    def get(self, request, pk):
        counter = get_object_or_404(Counter, pk=pk)
        return JsonResponse({"value": counter.value})


@api_view(["POST"])
def create_admin_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    return create_user_internal(username, password, email, is_superuser=True)


@api_view(["POST"])
def create_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    return create_user_internal(username, password)


# TODO: Doesn't work
@csrf_exempt
@api_view(["POST"])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response(
            {"message": "Login successful", "username": user.username},
            status=status.HTTP_200_OK,
        )
    else:
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


# TODO: Doesn't work
# https://www.django-rest-framework.org/api-guide/authentication/
class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            "user": str(request.user),  # `django.contrib.auth.User` instance.
            "auth": str(request.auth),  # None
        }
        return Response(content)


@api_view(["GET"])
def get_username(request):
    if request.user.is_authenticated:
        return Response({"username": request.user.username}, status=200)
    else:
        return Response({"error": "User is not authenticated."}, status=401)
