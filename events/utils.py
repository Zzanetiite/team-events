import json
import os

from django.conf import settings
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response

from team_events.settings import DOMAIN


def global_settings(request):
    return {"DOMAIN": DOMAIN}


class Utils:
    @staticmethod
    def index(request):
        return render(request, "index.html")

    @staticmethod
    def get_csrf_token(request):
        return JsonResponse({"success": "CSRF cookie set"})

    @staticmethod
    def get_manifest(file_name):
        manifest_path = os.path.join("events/", "asset-manifest.json")
        if os.path.exists(manifest_path):
            with open(manifest_path) as manifest_file:
                manifest = json.load(manifest_file)
                files = manifest.get("files", {})
                return files.get(file_name, file_name)
        return file_name

    @staticmethod
    def validate_admin_page_password(password):
        if password == settings.ADMIN_CREATE_PAGE_PASSWORD:
            return Response(
                {"message": "Success. Password correct."}, status=status.HTTP_200_OK
            )
        else:
            return JsonResponse(
                {"status": "error", "message": "Invalid password"}, status=403
            )

    @staticmethod
    def create_user_internal(username, password, email=None, is_superuser=False):
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
                User.objects.create_user(
                    username=username, password=password, email=email
                )
                return Response(
                    {"success": "User created successfully."},
                    status=status.HTTP_201_CREATED,
                )
        except IntegrityError:
            return Response(
                {"error": "Username already exists."}, status=status.HTTP_409_CONFLICT
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
