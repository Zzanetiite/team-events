#!/bin/bash
set -e  # Exit on any error

echo "Running collectstatic..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
gunicorn team_events.wsgi:application --bind 0.0.0.0:$PORT --workers 3
