from django.urls import path

from events.views.event import EventByUsernameView, EventViewSet, LatestEventsView

from .utils import ReactEnvVariableView, Utils
from .views.comment import CommentCreateView
from .views.event_by_type import EventByTypeView
from .views.nearby_events import NearbyEventsView
from .views.rating import RatingView
from .views.security import SecurityView
from .views.user_management import UserManagementView

urlpatterns = [
    path("", Utils.index, name="index"),
    path(
        "api/user/<str:action>/", UserManagementView.as_view(), name="user-management"
    ),
    path("api/get-react-env/", ReactEnvVariableView.as_view(), name="react-env"),
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
    path("api/events/nearby/", NearbyEventsView.as_view(), name="nearby-events"),
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
