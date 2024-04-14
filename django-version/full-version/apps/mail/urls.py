from django.urls import path
from .views import EmailView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "app/email/",
        login_required(EmailView.as_view(template_name="app_email.html")),
        name="app-email",
    ),
]
