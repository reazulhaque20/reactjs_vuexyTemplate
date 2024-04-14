from django.urls import path
from .views import FormWizardView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "form/wizard_numbered/",
        login_required(FormWizardView.as_view(template_name="form_wizard_numbered.html")),
        name="form-wizard-numbered",
    ),
    path(
        "form/wizard_icons/",
        login_required(FormWizardView.as_view(template_name="form_wizard_icons.html")),
        name="form-wizard-icons",
    ),
]
