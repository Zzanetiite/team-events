#!/bin/bash

# Exit script on any error
set -e

echo "===================================="
echo "Adding new packages to requirements..."
pip freeze > requirements.txt

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

mkdir -p $DJANGO_STATIC_PATH/js
mkdir -p $DJANGO_STATIC_PATH/css

echo "===================================="
echo "Removing old build files..."
rm -rf $DJANGO_STATIC_PATH/js/*
rm -rf $DJANGO_STATIC_PATH/css/*
rm $DJANGO_APP_PATH/asset-manifest.json

echo "===================================="
echo "Copying new files to the Django's static directory..."
cp -r $REACT_BUILD_PATH/static/js/* $DJANGO_STATIC_PATH/js/
cp -r $REACT_BUILD_PATH/static/css/* $DJANGO_STATIC_PATH/css/
cp $REACT_BUILD_PATH/asset-manifest.json $DJANGO_APP_PATH/
echo "Build artifacts have been copied to Django static directory."

echo "===================================="
echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "===================================="
echo "Loading initial data..."
python manage.py loaddata events/fixtures/initial_data.json

echo "===================================="
echo "Success! Local Deploy script complete."
