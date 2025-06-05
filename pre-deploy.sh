#!/bin/bash
set -e

echo "Running Django tests..."
python manage.py test --keepdb

echo "===================================="
echo "Success! Pre-Deploy script complete."
