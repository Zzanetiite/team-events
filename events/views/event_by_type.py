from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from rest_framework.response import Response
from rest_framework.views import APIView

from events.models.event import Event
from events.models.event_type import EventType
from events.serializers import EventSerializer


class EventByTypeView(APIView):
    def get(self, request, event_type_names):
        event_type_names = event_type_names.split(",")
        event_types = EventType.objects.filter(name__in=event_type_names)
        event_type_ids = [et.id for et in event_types]

        events = Event.objects.filter(event_type_id__in=event_type_ids)

        try:
            lat = request.query_params.get("lat")
            lng = request.query_params.get("lng")
            radius_km = request.query_params.get("radius_km", 30)

            if lat and lng:
                user_location = Point(float(lng), float(lat))
                radius_km = float(radius_km)

                events = (
                    events.filter(
                        location__coordinates__distance_lte=(
                            user_location,
                            D(km=radius_km),
                        )
                    )
                    .annotate(distance=Distance("location__coordinates", user_location))
                    .order_by("distance")
                )
        except (TypeError, ValueError):
            return Response({"error": "Invalid coordinates"}, status=400)

        serializer = EventSerializer(events, many=True, context={"request": request})
        return Response(serializer.data)
