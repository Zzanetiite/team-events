# Team Events

A full-stack web application to help organise team events. This app is a DEMO, it does not support real client base because it is not attached to a hosted database. The database used in this DEMO gets cleared at each deployment.

## Development instructions

### Prerequisites

- `pip` installed -> [pip installation](https://pip.pypa.io/en/stable/installation/)
- `python` installed -> [python installation](https://www.python.org/downloads/)
- `git` installed -> [git installation](https://github.com/git-guides/install-git)
- macOS, Linux or Windows machine is being used.
- IDE installed. Recommendation is to use Visual Studio.

### Setting up

Download the repository from git using:

```bash
git clone https://github.com/Zzanetiite/team-events.git
```

This application runs with Python. Therefore, it requires Python environment on the machine it is being ran. Ensure `pip` and `python` are installed on the machine prior to following

1. Create environment using

```bash
python -m venv venv
```

2. Activate the environment

```bash
source venv/bin/activate
```

3. Install dependencies from the root folder

```bash
pip install -r requirements.txt
```

4. Set up environment variables. Please ask administrator for the secret key. Firstly, create `.env` file in the main application directory like so

```bash
team_events/team_events/.env
```

Then populate `.env` file under `team_events/team_events/` with

```bash
SECRET_KEY=[ASK_ADMIN]
ALLOWED_HOSTS=localhost,127.0.0.1
ADMIN_CREATE_PAGE_PASSWORD=[ASK_ADMIN]
GOOGLE_MAPS_API_KEY=[ASK_ADMIN]
DOMAIN=http://localhost:8000
DATABASE_URL=[ASK_ADMIN]
```

### Running the project

Firstly, both packages need to be updated and built.

#### React

Build React package by navigating to React project root

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

### Development

See [React page](https://react.dev/learn/react-developer-tools) and `README.md` under React application for React development instructions. This project uses [Material UI components](https://mui.com/material-ui/), so please continue using these for new features.

See support materials provided in [Django page](https://www.djangoproject.com/) for back end development.

### Pre-deployment steps

From the project root folder, to save dependencies installed during development run

```bash
pip freeze > requirements.txt
```

To verify that deployment will be successful run the deploy bash script in the root folder. If this output "Success! Deploy script complete.",
the project is ready to be deployed.

```bash
bash .deploy.sh
```

Then add changes and commit them

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
