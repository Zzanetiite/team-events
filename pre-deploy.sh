#!/bin/bash

# Exit script on any error
set -e

echo "DATABASE_URL is: $DATABASE_URL"

echo "===================================="
echo "Collecting static files for Django..."
RUN python manage.py collectstatic --noinput

echo "===================================="
echo "Success! Pre-Deploy script complete."
