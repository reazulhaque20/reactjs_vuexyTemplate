from django.urls import path
from .views import ChartsView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "charts/apex/",
        login_required(ChartsView.as_view(template_name="charts_apex.html")),
        name="charts-apex",
    ),
    path(
        "charts/chartjs/",
        login_required(ChartsView.as_view(template_name="charts_chartjs.html")),
        name="charts-chartjs",
    ),
]
