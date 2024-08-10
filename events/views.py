import json
import os

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views import View
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework.response import Response

from team_events.settings import DOMAIN, REACT_BASENAME

from .models import Counter


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"success": "CSRF cookie set"})


def get_manifest(file_name):
    manifest_path = os.path.join("events/static", "react/asset-manifest.json")
    if os.path.exists(manifest_path):
        with open(manifest_path) as manifest_file:
            manifest = json.load(manifest_file)
            files = manifest.get("files", {})
            return files.get(file_name, file_name)
    return file_name


def global_settings(request):
    return {
        "DOMAIN": DOMAIN,
        "REACT_BASENAME": REACT_BASENAME,
    }


def index(request):
    return render(request, "index.html")


class IncrementCounterView(View):

    def post(self, request, pk):
        counter = get_object_or_404(Counter, pk=pk)
        counter.value += 1
        counter.save()
        return JsonResponse({"value": counter.value})

    def get(self, request, pk):
        counter = get_object_or_404(Counter, pk=pk)
        return JsonResponse({"value": counter.value})


# SECURITY WARNING! Only enable this to create the first admin user.
# This creates a page that allows anyone to create admin.
# It is, however, necessary because free plan doesn't provide SSH access.
@api_view(["POST"])
def create_admin_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    if not username or not password or not email:
        return Response(
            {"error": "Username, password, and email are required."}, status=400
        )

    try:
        User.objects.create_superuser(username, email, password)
        return Response({"success": "Admin user created successfully."}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
