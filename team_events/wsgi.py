"""
WSGI config for team_events project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
from pathlib import Path

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "team_events.settings")

application = get_wsgi_application()
application = WhiteNoise(application, root=os.path.join(BASE_DIR, "staticfiles"))
