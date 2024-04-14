from django.urls import path
from .views import SampleView


urlpatterns = [
    path(
        "",
        SampleView.as_view(template_name="index.html"),
        name="index",
    ),
    path(
        "page_2/",
        SampleView.as_view(template_name="page_2.html"),
        name="page-2",
    ),
]
