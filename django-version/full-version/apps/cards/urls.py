from django.urls import path
from .views import CardView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "cards/basic/",
        login_required(CardView.as_view(template_name="cards_basic.html")),
        name="cards-basic",
    ),
    path(
        "cards/advance/",
        login_required(CardView.as_view(template_name="cards_advance.html")),
        name="cards-advance",
    ),
    path(
        "cards/statistics/",
        login_required(CardView.as_view(template_name="cards_statistics.html")),
        name="cards-statistics",
    ),
    path(
        "cards/analytics/",
        login_required(CardView.as_view(template_name="cards_analytics.html")),
        name="cards-analytics",
    ),
    path(
        "cards/actions/",
        login_required(CardView.as_view(template_name="cards_actions.html")),
        name="cards-actions",
    ),
]
