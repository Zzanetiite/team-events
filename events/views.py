import json
import os

from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views import View
from django.views.decorators.csrf import ensure_csrf_cookie

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
