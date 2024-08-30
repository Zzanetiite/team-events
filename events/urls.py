from django.urls import path

from events.views.event import (
    EventByTypeView,
    EventByUsernameView,
    EventViewSet,
    LatestEventsView,
)

from .utils import Utils
from .views.comment import CommentCreateView
from .views.rating import RatingView
from .views.security import SecurityView
from .views.user_management import UserManagementView

urlpatterns = [
    path("", Utils.index, name="index"),
    path(
        "api/user/<str:action>/", UserManagementView.as_view(), name="user-management"
    ),
    path("api/security/<str:action>/", SecurityView.as_view(), name="security"),
    path("api/security/<str:action>/", SecurityView.as_view(), name="security"),
    # Event-specific endpoints
    path(
        "api/events/username/<str:username>/",
        EventByUsernameView.as_view(),
        name="events-by-username",
    ),
    path(
        "api/events/by-type/<str:event_type_names>/",
        EventByTypeView.as_view(),
        name="events_by_type_names",
    ),
    path("api/events/latest/", LatestEventsView.as_view(), name="latest-events"),
    path(
        "api/events/<int:pk>/",
        EventViewSet.as_view(
            {"get": "retrieve", "put": "update", "patch": "update", "delete": "destroy"}
        ),
        name="event-detail",
    ),
    path(
        "api/events/",
        EventViewSet.as_view({"get": "list", "post": "create"}),
        name="event-list",
    ),
    path("api/ratings/", RatingView.as_view(), name="rating-list"),
    path("api/comment/", CommentCreateView.as_view(), name="comment-create"),
]
