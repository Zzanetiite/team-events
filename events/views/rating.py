from django.db.models import Avg
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from events.models.rating import Rating
from events.serializers import RatingSerializer


class RatingView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            user = validated_data["user"]
            event = validated_data["event"]
            rating_type = validated_data["rating_type"]
            score = validated_data["score"]

            # Check if the user has already rated this event with the same rating_type
            rating, created = Rating.objects.update_or_create(
                event=event,
                user=user,
                rating_type=rating_type,
                defaults={"score": score},
            )

            # Calculate the new average rating for the event
            self.update_event_average_rating(event)

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_event_average_rating(self, event):
        ratings = Rating.objects.filter(event=event)
        if ratings.exists():
            average_event_rating = ratings.filter(rating_type__name="Event").aggregate(
                Avg("score")
            )["score__avg"]
            average_loudness_rating = ratings.filter(
                rating_type__name="Loudness"
            ).aggregate(Avg("score"))["score__avg"]

            event.average_rating_event = (
                round(average_event_rating) if average_event_rating else None
            )
            event.average_rating_loudness = (
                round(average_loudness_rating) if average_loudness_rating else None
            )
            event.save()
