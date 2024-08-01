# events/views.py

import json
import os

from django.shortcuts import render


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
