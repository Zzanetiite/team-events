from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from events.models.event import Event
from events.serializers import EventSerializer


class NearbyEventsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            lat = float(request.query_params.get("lat"))
            lng = float(request.query_params.get("lng"))
            radius_km = float(request.query_params.get("radius_km"))
            user_location = Point(lng, lat)
        except (TypeError, ValueError):
            return Response({"error": "Invalid or missing lat/lng"}, status=400)

        nearby_events = (
            Event.objects.filter(
                location__coordinates__distance_lte=(user_location, D(km=radius_km))
            )
            .annotate(distance=Distance("location__coordinates", user_location))
            .order_by("distance")[:10]
        )

        serializer = EventSerializer(
            nearby_events, many=True, context={"request": request}
        )

        return Response(serializer.data)
