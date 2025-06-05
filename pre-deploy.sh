#!/bin/bash
set -e

echo "Running Django tests..."
python manage.py test --noinput

echo "===================================="
echo "Success! Pre-Deploy script complete."
