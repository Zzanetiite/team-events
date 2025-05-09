#!/bin/bash

# Exit script on any error
set -e

echo "===================================="
echo "Installing requirements..."
pip install -r requirements.txt

# Export .env for development
cd team_events
if [ -f ".env" ]; then
    echo "===================================="
    echo "Exporting environment variables..."
    export $(grep -v '^#' .env | xargs)
    fi
cd ../

echo "===================================="
echo "Setting up React environment..."
bash create_react_env.sh

echo "===================================="
echo "Navigating to React app directory..."
cd react-events-app/

echo "===================================="
echo "Installing React dependencies..."
npm install

echo "===================================="
echo "Building React app..."
npm run build

echo "===================================="
echo "Returning to project root..."
cd ../

REACT_BUILD_PATH=react-events-app/build
DJANGO_APP_PATH=events
DJANGO_STATIC_PATH=$DJANGO_APP_PATH/static

echo "===================================="
echo "Copying build files to the Django's static directory..."

mkdir -p $DJANGO_STATIC_PATH/js
mkdir -p $DJANGO_STATIC_PATH/css

cp -r $REACT_BUILD_PATH/static/js/* $DJANGO_STATIC_PATH/js/
cp -r $REACT_BUILD_PATH/static/css/* $DJANGO_STATIC_PATH/css/
cp $REACT_BUILD_PATH/asset-manifest.json $DJANGO_APP_PATH/

echo "Build artifacts have been copied to Django static directory."


echo "===================================="
echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "===================================="
echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "===================================="
echo "Success! Deploy script complete."
