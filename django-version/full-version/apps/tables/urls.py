from django.urls import path
from .views import TableView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "tables/basic/",
        login_required(TableView.as_view(template_name="tables_basic.html")),
        name="tables-basic",
    ),
    path(
        "tables/datatables_basic/",
        login_required(TableView.as_view(template_name="tables_datatables_basic.html")),
        name="tables-datatables-basic",
    ),
    path(
        "tables/datatables_advanced/",
        login_required(TableView.as_view(template_name="tables_datatables_advanced.html")),
        name="tables-datatables-advanced",
    ),
    path(
        "tables/datatables_extensions/",
        login_required(TableView.as_view(template_name="tables_datatables_extensions.html")),
        name="tables-datatables-extensions",
    ),
]
