#!/bin/bash
set -e

echo "===================================="
echo "Creating staticfiles directory..."
mkdir -p /app/staticfiles

echo "===================================="
echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "===================================="
echo "Success! Pre-Deploy script complete."
