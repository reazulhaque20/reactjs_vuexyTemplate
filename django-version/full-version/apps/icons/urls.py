from django.urls import path
from .views import IconsView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "icons/tabler/",
        login_required(IconsView.as_view(template_name="icons_tabler.html")),
        name="icons-tabler",
    ),
    path(
        "icons/font_awesome/",
        login_required(IconsView.as_view(template_name="icons_font_awesome.html")),
        name="icons-font-awesome",
    ),
]
