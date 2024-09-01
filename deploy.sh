#!/bin/bash

# Exit script on any error
set -e

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Setting up React environment..."
bash create_react_env.sh

echo "Navigating to React app directory..."
cd events/static/react/react-events-app/

echo "Installing React dependencies..."
npm install

echo "Building React app..."
npm run build

echo "Checking build output..."
ls -l build/static/js/

echo "Returning to project root..."
cd ../../../../

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "Creating user..."
python manage.py create_user

echo "Loading initial data..."
python manage.py loaddata events/fixtures/initial_data.json

echo "Deploy script complete"
