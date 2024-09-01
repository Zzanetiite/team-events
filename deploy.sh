#!/bin/bash

# Exit script on any error
set -e

echo "===================================="
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "===================================="
echo "Setting up React environment..."
bash create_react_env.sh

echo "===================================="
echo "Navigating to React app directory..."
cd events/static/react/react-events-app/

echo "===================================="
echo "Cleaning up React build directory..."
rm -rf node_modules/
npm cache clean --force

echo "===================================="
echo "Installing React dependencies..."
npm install

echo "===================================="
echo "Building React app..."
npm run build

echo "===================================="
echo "Returning to project root..."
cd ../../../../

echo "===================================="
echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "===================================="
echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "===================================="
echo "Creating user..."
python manage.py create_user

echo "===================================="
echo "Loading initial data..."
python manage.py loaddata events/fixtures/initial_data.json

echo "===================================="
echo "Success! Deploy script complete."
