from django.urls import path
from .views import DashboardsView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "",
        login_required(DashboardsView.as_view(template_name="dashboard_analytics.html")),
        name="index",
    ),

    path(
        "dashboard/crm/",
        login_required(DashboardsView.as_view(template_name="dashboard_crm.html")),
        name="dashboard-crm",
    ),
]
