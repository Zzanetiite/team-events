# Team Events

A full-stack web application to help organise team events. This app is a DEMO, it does not support real client base because it is not attached to a hosted database. The database used in this DEMO gets cleared at each deployment.

## Development instructions

### Prerequisites

- `pip` installed -> [pip installation](https://pip.pypa.io/en/stable/installation/)
- `python` installed -> [python installation](https://www.python.org/downloads/)
- `git` installed -> [git installation](https://github.com/git-guides/install-git)
- macOS, Linux or Windows machine is being used.
- IDE installed. Recommendation is to use Visual Studio.
- Docker installed -> [docker installation](https://www.docker.com/products/docker-desktop)
- FOR DEVELOPING UNIT TESTS ONLY, install GDAL libraries -> https://pypi.org/project/GDAL/

### Setting up

Download the repository from git using:

```bash
git clone https://github.com/Zzanetiite/team-events.git
```

This application runs with Python. Therefore, it requires Python environment on the machine it is being ran. Ensure `pip` and `python` are installed on the machine prior to following

1. Set up environment variables. Please ask administrator for the secret key. Firstly, create `.env` file in the main application directory like so

```bash
team_events/.env
```

Then populate `.env` file under `team_events/team_events` with

```bash
SECRET_KEY=[ASK_ADMIN]
ALLOWED_HOSTS=localhost,127.0.0.1
ADMIN_CREATE_PAGE_PASSWORD=[ASK_ADMIN]
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

### Warnings to know about

#### Assistive technology warning

This warning is caused by the buttins in the Accordion and Dialog components. For this project, pop ups are part of the design that has not been develped for accessibility. The design would be different if accessibility was a requirement, but it is not. Therefore, please ignore the warnings.

```bash
Blocked aria-hidden on a <button> element because the element that just received focus must not be hidden from assistive technology users. Avoid using aria-hidden on a focused element or its ancestor. Consider using the inert attribute instead, which will also prevent focus. For more details, see the aria-hidden section of the WAI-ARIA specification at https://w3c.github.io/aria/#aria-hidden.
```
