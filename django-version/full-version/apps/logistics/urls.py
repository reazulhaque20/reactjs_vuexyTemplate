from django.urls import path
from .views import LogisticsView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "app/logistics/dashboard/",
        login_required(LogisticsView.as_view(template_name="app_logistics_dashboard.html")),
        name="app-logistics-dashboard",
    ),
    path(
        "app/logistics/fleet/",
        login_required(LogisticsView.as_view(template_name="app_logistics_fleet.html")),
        name="app-logistics-fleet",
    ),
]
