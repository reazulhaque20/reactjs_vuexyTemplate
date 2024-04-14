from django.urls import path
from .views import FormsView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "forms/basic_inputs/",
        login_required(FormsView.as_view(template_name="forms_basic_inputs.html")),
        name="forms-basic-inputs",
    ),
    path(
        "forms/input_groups/",
        login_required(FormsView.as_view(template_name="forms_input_groups.html")),
        name="forms-input-groups",
    ),
    path(
        "forms/custom_options/",
        login_required(FormsView.as_view(template_name="forms_custom_options.html")),
        name="forms-custom-options",
    ),
    path(
        "forms/editors/",
        login_required(FormsView.as_view(template_name="forms_editors.html")),
        name="forms-editors",
    ),
    path(
        "forms/file_upload/",
        login_required(FormsView.as_view(template_name="forms_file_upload.html")),
        name="forms-file-upload",
    ),
    path(
        "forms/pickers/",
        login_required(FormsView.as_view(template_name="forms_pickers.html")),
        name="forms-pickers",
    ),
    path(
        "forms/selects/",
        login_required(FormsView.as_view(template_name="forms_selects.html")),
        name="forms-selects",
    ),
    path(
        "forms/sliders/",
        login_required(FormsView.as_view(template_name="forms_sliders.html")),
        name="forms-sliders",
    ),
    path(
        "forms/switches/",
        login_required(FormsView.as_view(template_name="forms_switches.html")),
        name="forms-switches",
    ),
    path(
        "forms/extras/",
        login_required(FormsView.as_view(template_name="forms_extras.html")),
        name="forms-extras",
    ),
]
