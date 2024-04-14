from django.urls import path
from .views import InvoiceView, InvoicePrintView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "app/invoice/list/",
        login_required(InvoiceView.as_view(template_name="app_invoice_list.html")),
        name="app-invoice-list",
    ),
    path(
        "app/invoice/preview/",
        login_required(InvoiceView.as_view(template_name="app_invoice_preview.html")),
        name="app-invoice-preview",
    ),
    path(
        "app/invoice/edit/",
        login_required(InvoiceView.as_view(template_name="app_invoice_edit.html")),
        name="app-invoice-edit",
    ),
    path(
        "app/invoice/add/",
        login_required(InvoiceView.as_view(template_name="app_invoice_add.html")),
        name="app-invoice-add",
    ),
    path(
        "app/invoice/print/",
        login_required(InvoicePrintView.as_view(template_name="app_invoice_print.html")),
        name="app-invoice-print",
    ),
]
