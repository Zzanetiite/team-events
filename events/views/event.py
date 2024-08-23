from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from events.models.event import Event
from events.serializers import EventSerializer


# TOOD: Permissions classes
class EventViewSet(viewsets.ViewSet):
    def list(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def create(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        event = get_object_or_404(Event, pk=pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EventByUsernameView(APIView):
    def get(self, request, username):
        events = Event.objects.filter(user__username=username)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class EventByTypeView(APIView):
    def get(self, request, event_type_id):
        events = Event.objects.filter(event_type_id=event_type_id)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class LatestEventsView(APIView):
    def get(self, request):
        events = Event.objects.order_by("-id")[:10]  # Latest 10 event IDs
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
