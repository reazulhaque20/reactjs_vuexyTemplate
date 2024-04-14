from django.urls import path
from .views import FrontPagesView


urlpatterns = [
    path(
        "front/landing/",
        FrontPagesView.as_view(template_name="landing_page.html"),
        name="landing-page",
    ),
    path(
        "front/pricing/",
        FrontPagesView.as_view(template_name="pricing_page.html"),
        name="pricing-page",
    ),
    path(
        "front/payment/",
        FrontPagesView.as_view(template_name="payment_page.html"),
        name="payment-page",
    ),
    path(
        "front/checkout/",
        FrontPagesView.as_view(template_name="checkout_page.html"),
        name="checkout-page",
    ),
    path(
        "front/help_center/",
        FrontPagesView.as_view(template_name="help_center_landing.html"),
        name="help-center-landing",
    ),
    path(
        "front/help_center/article/",
        FrontPagesView.as_view(template_name="help_center_article.html"),
        name="help-center-article",
    ),
]
