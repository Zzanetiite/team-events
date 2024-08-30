from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from events.models.comment import Comment
from events.models.event import Event
from events.serializers import CommentSerializer


class CommentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        event_id = request.data.get("event")
        comment_text = request.data.get("comment")

        if not event_id or not comment_text:
            return Response(
                {"error": "Event ID and comment text are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response(
                {"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND
            )

        comment = Comment.objects.create(
            comment=comment_text, event=event, user=request.user
        )

        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
