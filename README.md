# Team Events

A full-stack web application to help organise team events.

## Table of Contents

- [Development Instructions](#development-instructions)
  - [Prerequisites](#prerequisites)
  - [Setting up](#setting-up)
  - [Running the Project](#running-the-project)
  - [Creating an Admin Account](#creating-an-admin-account)
  - [Docker Usage](#docker)
  - [React Usage](#react)
  - [Django Usage](#django)
  - [Database Access](#database)
- [Development](#development)
- [Updating Packages](#updating-packages)
- [Unit Testing](#unit-testing)
- [Pre-deployment steps](#pre-deployment-steps)

---

## Development instructions

### Prerequisites

Ensure the following are installed:

- [Python](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [Git](https://github.com/git-guides/install-git)
- [Docker](https://www.docker.com/products/docker-desktop)
- GDAL libraries for local development: https://pypi.org/project/GDAL/
- IDE (e.g., Visual Studio Code)

---

### Setting up

Clone the repository:

```bash
git clone https://github.com/Zzanetiite/team-events.git
cd team-events
```

Set up a .env file at team_events/team_events/.env with the following (ask admin for secrets):

```
SECRET_KEY=[ASK_ADMIN]
ALLOWED_HOSTS=localhost,127.0.0.1
GOOGLE_MAPS_API_KEY=[ASK_ADMIN]
DOMAIN=http://localhost:8000
DATABASE_URL=[ASK_ADMIN]
POSTGRES_DB=[ASK_ADMIN]
POSTGRES_USER=[ASK_ADMIN]
POSTGRES_PASSWORD=[ASK_ADMIN]
PORT=8000
```

### Running the project

Project is ran using docker. Start Docker, e.g., in Windows open "Docker Desktop", build and start the Docker container, and then run the following from the `team_events/` of the package:

```bash
docker-compose up --build
```

### Creating an Admin Account

Only admins are allowed to create admin via the websites create admin page.

The alternative, programmatically, is to create an admin via the server.
After starting the Django server (via Docker or locally), run:

```bash
docker exec -it team_events-web-1 python manage.py createsuperuser
```

Follow prompts to create a username, email, and password.

To access the admin panel:

Open browser: http://localhost:8000/admin/

Login using the newly created superuser credentials.

#### Docker

To build application with Docker:

```bash
docker build --no-cache -t team_events .
```

To start Docker:

```bash
docker-compose up --build
```

OR to include newest React changes (requires exported env variables `export $(grep -v '^#' .env | xargs)`)

```
docker run -e PORT=8000 -p 8000:8000 team_events:latest
```

To stop Docker:

```bash
docker-compose down
```

To migrate database changes in Docker.
Create a container interactive shell session and then run Django migrations commands from shell.

```bash
docker run --rm -it -v "${PWD}:/app" team_events bash
```

To clean up Docker resources (needed if device is low on CPU):

```bash
docker-compose down --volumes --remove-orphans
docker system prune -a --volumes
```

#### React

Build the React package by navigating to React project root

```bash
cd team_events/events/static/react/react-events-app/
```

and running build command

```bash
npm run build
```

This will build the project and collect all React static files under `static/`. Django will pick these up from there and server them as front end.

To run React app run

```bash
npm run start
```

#### Django

To ensure all database migrations are applied, from the root project folder (`team_events/`) run

```bash
python manage.py makemigrations
```

and

```bash
python manage.py migrate
```

Start the server with

```bash
python manage.py runserver
```

Run tests with

```bash
python manage.py test --keepdb
```

#### Database

To connect to database

```bash
docker exec -it team_events-db-1 psql -U <your_user> -d postgres
```

### Development

See [React page](https://react.dev/learn/react-developer-tools) and `README.md` under React application for React development instructions. This project uses [Material UI components](https://mui.com/material-ui/), so please continue using these for new features.

See support materials provided in [Django page](https://www.djangoproject.com/) for back end development.

#### Updating packages

Check for all outdated packages

```bash
npm outdated
```

Auto upgrade

```bash
npm install -g npm-check-updates
ncu -u
npm install
```

WARNING: Upgrades can and sometimes do break things! Verify the app still works before deploying.

### Unit Testing

To run unit tests in a local machine using the GDAL library:

1. Deactivate the python environment

```bash
deactivate
```

2. Initialise Conda (in Windows, check online for other OS). View environments with `conda info --envs`.

```bash
conda activate $MY_ENV_NAME
```

3. Install GDAL dependency

```bash
conda install -c conda-forge gdal
```

4. Install all other dependencies

```bash
pip install -r requirements.txt
```

5. Export path for installed GDAL library

```bash
export GDAL_LIBRARY_PATH="C:/Users/zanet/Miniconda3/envs/myenv/Library/bin/gdal.dll"
```

6. Run tests with Django

```bash
python manage.py test --keepdb
```

### Pre-deployment steps

From the project root folder, to save dependencies installed during development run

```bash
pip freeze > requirements.txt
```

Add changes and commit them

```bash
git add -A
```

```bash
git commit -m "Message of changes"
```

After commit, pre-commit formatters will run. You may need to re-add files and run commit again.

For any issues see - https://pre-commit.com/

Before pushing anything to git, please ensure the changes are ready for prod. Render will automatically register new git pushes and start deploying them immediately.

```bash
git push
```
