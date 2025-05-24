#!/bin/bash

# Exit script on any error
set -e

echo "===================================="
echo "Dumping env variables for docker-compose..."
printenv > ./team_events/.env

echo "===================================="
echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "===================================="
echo "Success! Pre-Deploy script complete."
