from django.urls import path
from .views import ModalExampleView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "modal_examples/",
        login_required(ModalExampleView.as_view(template_name="modal_examples.html")),
        name="modal-examples",
    ),
]
