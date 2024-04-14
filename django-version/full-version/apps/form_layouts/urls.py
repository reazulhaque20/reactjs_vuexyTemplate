from django.urls import path
from .views import FormLayoutsView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "form/layouts_vertical/",
        login_required(FormLayoutsView.as_view(template_name="form_layouts_vertical.html")),
        name="form-layouts-vertical",
    ),
    path(
        "form/layouts_horizontal/",
        login_required(FormLayoutsView.as_view(template_name="form_layouts_horizontal.html")),
        name="form-layouts-horizontal",
    ),
    path(
        "form/layouts_sticky/",
        login_required(FormLayoutsView.as_view(template_name="form_layouts_sticky.html")),
        name="form-layouts-sticky",
    ),
]
