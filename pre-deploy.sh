#!/bin/bash

# Exit script on any error
set -e

echo "===================================="
echo "Collecting static files for Django..."
python manage.py collectstatic --noinput

echo "===================================="
echo "Success! Pre-Deploy script complete."
