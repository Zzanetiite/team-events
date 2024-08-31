from django.db import models


class Location(models.Model):
    id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=255)
    lat = models.FloatField()  # Latitude
    lng = models.FloatField()  # Longitude

    def __str__(self):
        return self.address
