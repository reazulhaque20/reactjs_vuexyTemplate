from django.urls import path
from .views import ChatView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "app/chat/",
        login_required(ChatView.as_view(template_name="app_chat.html")),
        name="app-chat",
    ),
]
