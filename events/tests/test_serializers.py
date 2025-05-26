from django.test import TestCase

from events.models.comment import Comment
from events.models.event import EventType
from events.models.rating_type import RatingType
from events.serializers import (
    CommentSerializer,
    EventSerializer,
    EventTypeSerializer,
    LocationSerializer,
    RatingSerializer,
    UserSerializer,
)
from events.tests.create_test_data import initialize_test_data


class SerializerTests(TestCase):
    def setUp(self):
        data = initialize_test_data()
        self.user = data["user"]
        self.user1 = data["user1"]
        self.event_type = data["event_type"]
        self.location = data["location"]
        self.event = data["event"]

        self.rating_type_place = RatingType.objects.get_or_create(name="Place Rating")[
            0
        ]
        self.rating_type_loudness = RatingType.objects.get_or_create(
            name="Loudness Rating"
        )[0]

    def test_user_serializer_create_and_serialize(self):
        user_data = {"username": "newuser", "password": "newpass"}
        serializer = UserSerializer(data=user_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertEqual(user.username, "newuser")
        # Password should be write-only
        self.assertNotIn("password", serializer.data)

        # Serialization includes username only
        serializer = UserSerializer(user)
        self.assertEqual(serializer.data["username"], "newuser")

    def test_event_type_serializer(self):
        serializer = EventTypeSerializer(self.event_type)
        self.assertIn("id", serializer.data)
        self.assertEqual(serializer.data["name"], self.event_type.name)

    def test_rating_serializer_create_and_update(self):
        rating_data = {
            "event": self.event.pk,
            "user": self.user.pk,
            "rating_type": self.rating_type_place.pk,
            "score": 4,
        }
        serializer = RatingSerializer(data=rating_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        rating = serializer.save()
        self.assertEqual(rating.score, 4)

        # Test update score
        updated_data = {"score": 5}
        serializer = RatingSerializer(rating, data=updated_data, partial=True)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        updated_rating = serializer.save()
        self.assertEqual(updated_rating.score, 5)

    def test_comment_serializer(self):
        comment = Comment.objects.create(
            event=self.event,
            user=self.user,
            comment="Test comment",
        )
        serializer = CommentSerializer(comment)
        self.assertEqual(serializer.data["comment"], "Test comment")
        self.assertEqual(serializer.data["user"], self.user.username)

    def test_location_serializer_create_and_update(self):
        location_data = {
            "address": "456 Another St",
            "lat": 51.5,
            "lng": -0.12,
        }
        serializer = LocationSerializer(data=location_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        location = serializer.save()
        self.assertEqual(location.address, "456 Another St")
        self.assertEqual(location.coordinates.y, 51.5)
        self.assertEqual(location.coordinates.x, -0.12)

        # Test update coordinates
        update_data = {"lat": 52.0, "lng": -0.1}
        serializer = LocationSerializer(location, data=update_data, partial=True)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        updated_location = serializer.save()
        self.assertEqual(updated_location.coordinates.y, 52.0)
        self.assertEqual(updated_location.coordinates.x, -0.1)

    def test_event_serializer_create_and_update(self):
        data = {
            "title": "Test Event",
            "description": "Description here",
            "event_type": self.event_type.name,
            "location": {
                "address": "789 Test Rd",
                "lat": 10.0,
                "lng": 20.0,
            },
        }
        serializer = EventSerializer(data=data, context={"request": None})
        self.assertTrue(serializer.is_valid(), serializer.errors)
        event = serializer.save(user=self.user)  # Add user manually if needed
        self.assertEqual(event.title, "Test Event")
        self.assertEqual(event.event_type.name, self.event_type.name)
        self.assertEqual(event.location.address, "789 Test Rd")
        self.assertAlmostEqual(event.location.coordinates.x, 20.0)
        self.assertAlmostEqual(event.location.coordinates.y, 10.0)

        # Test update with new location and event_type by name
        new_event_type = EventType.objects.create(name="NewType")
        update_data = {
            "title": "Updated Title",
            "event_type": new_event_type.name,
            "location": {
                "address": "Updated Address",
                "lat": 30.0,
                "lng": 40.0,
            },
        }
        serializer = EventSerializer(
            event, data=update_data, partial=True, context={"request": None}
        )
        self.assertTrue(serializer.is_valid(), serializer.errors)
        updated_event = serializer.save()
        self.assertEqual(updated_event.title, "Updated Title")
        self.assertEqual(updated_event.event_type.name, "NewType")
        self.assertEqual(updated_event.location.address, "Updated Address")
        self.assertAlmostEqual(updated_event.location.coordinates.x, 40.0)
        self.assertAlmostEqual(updated_event.location.coordinates.y, 30.0)

    def test_event_serializer_invalid_event_type(self):
        data = {
            "title": "Invalid Event",
            "description": "desc",
            "event_type": "nonexistenttype",
            "location": {
                "address": "Some Address",
                "lat": 0,
                "lng": 0,
            },
        }
        serializer = EventSerializer(data=data, context={"request": None})
        self.assertFalse(serializer.is_valid())
        self.assertIn("event_type", serializer.errors)
