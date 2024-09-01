#!/bin/bash

cd events/static/react/react-events-app

echo "REACT_APP_ADMIN_CREATE_PAGE_PASSWORD=${ADMIN_CREATE_PAGE_PASSWORD}" > .env
echo "REACT_APP_GOOGLE_MAPS_API_KEY=${REACT_APP_GOOGLE_MAPS_API_KEY}" >> .env

cat .env
