from django.db.models import Avg
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from events.models.event import Event
from events.models.rating import Rating
from events.serializers import RatingSerializer


class RatingView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            user = validated_data["user"]
            event_id = validated_data["event"].id
            rating_type = validated_data["rating_type"]
            score = validated_data["score"]

            Rating.objects.update_or_create(
                event_id=event_id,
                user=user,
                rating_type=rating_type,
                defaults={"score": score},
            )

            self.update_event_average_rating(event_id)

            return Response(
                {"message": "Rating updated successfully."}, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_event_average_rating(self, event_id):
        event = Event.objects.get(id=event_id)

        ratings = Rating.objects.filter(event=event)
        if ratings.exists():
            average_event_rating = ratings.filter(
                rating_type__name="Place Rating"
            ).aggregate(Avg("score"))["score__avg"]
            average_loudness_rating = ratings.filter(
                rating_type__name="Loudness Rating"
            ).aggregate(Avg("score"))["score__avg"]

            event.average_rating_event = (
                round(average_event_rating, 1) if average_event_rating else None
            )
            event.average_rating_loudness = (
                round(average_loudness_rating, 1) if average_loudness_rating else None
            )
            event.save()
