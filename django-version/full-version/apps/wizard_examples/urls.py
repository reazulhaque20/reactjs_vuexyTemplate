from django.urls import path
from .views import WizardExamplesView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "wizard_ex/checkout/",
        login_required(WizardExamplesView.as_view(template_name="wizard_ex_checkout.html")),
        name="wizard-ex-checkout",
    ),
    path(
        "wizard_ex/property_listing/",
        login_required(WizardExamplesView.as_view(template_name="wizard_ex_property_listing.html")),
        name="wizard-ex-property-listing",
    ),
    path(
        "wizard_ex/create_deal/",
        login_required(WizardExamplesView.as_view(template_name="wizard_ex_create_deal.html")),
        name="wizard-ex-create-deal",
    ),
]
