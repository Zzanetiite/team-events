# Fixtures Documentation

## Overview

This directory contains fixture files used to populate the database with initial data.

- `initial_data.json`contains data to load when starting the Django app for all models. This is necessary because the SQlite database gets wiped out for every deployment. Another database option was considered - unfortunately, currently, well-known database providers no longer have free tier for databases. Since university does not provide us with access to another type of database, fixtures enables a relatively smooth development to create the demo app.

## JSON Structure

Each entry in the JSON file represents a record of the model with the following fields:

- `model`: Specifies the model the data belongs (e.g., `events.events`).
- `pk`: The primary key for the record.
- `fields`: Contains the data for the record; each key corresponding to an attribute of the model.
