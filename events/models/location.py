from django.contrib.gis.db import models, models as gis_models
from django.contrib.gis.geos import Point


class Location(models.Model):
    id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=255)
    coordinates = gis_models.PointField(null=True, blank=True, default=Point(0.0, 0.0))

    def __str__(self):
        return self.address
