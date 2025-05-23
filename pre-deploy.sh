#!/bin/bash

# Exit script on any error
set -e

echo "===================================="
echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "===================================="
echo "Success! Pre-Deploy script complete."
