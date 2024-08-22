from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path(
        "api/counter/<int:pk>/increment/",
        views.IncrementCounterView.as_view(),
        name="increment-counter",
    ),
    path("api/counter/<int:pk>/", views.IncrementCounterView.as_view(), name="counter"),
    path("api/get-csrf-token/", views.get_csrf_token),
    path("api/create-user/", views.create_user, name="create_user"),
    path("api/login/", views.LoginView.as_view(), name="login"),
    path("api/logout/", views.logout_view, name="logout"),
    path("api/get-username/", views.get_username, name="get_username"),
    path(
        "api/validate-admin-page-password/",
        views.validate_admin_page_password,
        name="validate_admin_page_password",
    ),
    # SECURITY WARNING! See view create_admin_user for info.
    path("api/create-admin-user/", views.create_admin_user, name="create-admin-user"),
]
