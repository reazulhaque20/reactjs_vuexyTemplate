from django.urls import path
from .views import UsersView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "app/user/list/",
        login_required(UsersView.as_view(template_name="app_user_list.html")),
        name="app-user-list",
    ),
    path(
        "app/user/view/account/",
        login_required(UsersView.as_view(template_name="app_user_view_account.html")),
        name="app-user-view-account",
    ),
    path(
        "app/user/view/security/",
        login_required(UsersView.as_view(template_name="app_user_view_security.html")),
        name="app-user-view-security",
    ),
    path(
        "app/user/view/billing/",
        login_required(UsersView.as_view(template_name="app_user_view_billing.html")),
        name="app-user-view-billing",
    ),
    path(
        "app/user/view/notifications/",
        login_required(UsersView.as_view(template_name="app_user_view_notifications.html")),
        name="app-user-view-notifications",
    ),
    path(
        "app/user/view/connections/",
        login_required(UsersView.as_view(template_name="app_user_view_connections.html")),
        name="app-user-view-connections",
    ),
]
