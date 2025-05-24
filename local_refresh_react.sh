#!/bin/bash

# Exit script on any error
set -e

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
echo "Success! Local Django refresh script complete."
