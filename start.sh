#!/bin/bash

# Exit script on any error
set -e

echo "===================================="
echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
gunicorn team_events.wsgi:application --bind 0.0.0.0:$PORT --workers 3
