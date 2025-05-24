#!/bin/bash
set -e  # Exit on any error

echo "PORT=$PORT"
echo "DEBUG=$DEBUG"
echo "ALLOWED_HOSTS=$ALLOWED_HOSTS"
echo "STATIC_ROOT=$STATIC_ROOT"
echo "SECURE_SSL_REDIRECT=$SECURE_SSL_REDIRECT"
echo "SECURE_PROXY_SSL_HEADER=$SECURE_PROXY_SSL_HEADER"
ls -la $STATIC_ROOT

echo "Running collectstatic..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
gunicorn team_events.wsgi:application --bind 0.0.0.0:$PORT --workers 3
