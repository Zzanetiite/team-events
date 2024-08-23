from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a default user for production"

    def handle(self, *args, **kwargs):
        username = "admin"
        password = "password"
        email = "initial_data_uploader@dummy.com"

        if not User.objects.filter(username=username).exists():
            User.objects.create_user(username=username, password=password, email=email)
            self.stdout.write(
                self.style.SUCCESS(f"Successfully created user {username}")
            )
        else:
            self.stdout.write(self.style.SUCCESS(f"User {username} already exists"))
