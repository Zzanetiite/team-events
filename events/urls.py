from django.urls import path

from . import views
from .views import IncrementCounterView, get_csrf_token

urlpatterns = [
    path("", views.index, name="index"),
    path(
        "api/counter/<int:pk>/increment/",
        IncrementCounterView.as_view(),
        name="increment-counter",
    ),
    path("api/counter/<int:pk>/", views.IncrementCounterView.as_view(), name="counter"),
    path("api/get-csrf-token/", get_csrf_token),
    # SECURITY WARNING! See view create_admin_user for info.
    # path("api/create-admin-user/", views.create_admin_user, name="create-admin-user"),
]
