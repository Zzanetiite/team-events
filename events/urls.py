from django.urls import path

from events.views.event import EventByTypeView, EventByUsernameView, LatestEventsView

from .utils import Utils
from .views.counter import IncrementCounterView
from .views.security import SecurityView
from .views.user_management import UserManagementView

urlpatterns = [
    path("", Utils.index, name="index"),
    path(
        "api/counter/<int:pk>/increment/",
        IncrementCounterView.as_view(),
        name="increment-counter",
    ),
    path("api/counter/<int:pk>/", IncrementCounterView.as_view(), name="counter"),
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
        "api/events/type/<int:event_type_id>/",
        EventByTypeView.as_view(),
        name="events-by-type",
    ),
    path("api/events/latest/", LatestEventsView.as_view(), name="latest-events"),
]
