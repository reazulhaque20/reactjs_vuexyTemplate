from django.views.generic import TemplateView
from web_project import TemplateLayout
from django.contrib.auth.mixins import PermissionRequiredMixin


"""
This file is a view controller for multiple pages as a module.
Here you can override the page view layout.
Refer to access/urls.py file for more pages.
"""


class AccessView(PermissionRequiredMixin, TemplateView):
    permission_required = ("permission.view_permission", "permission.delete_permission", "permission.change_permission", "permission.add_permission")
    # Predefined function
    def get_context_data(self, **kwargs):
        # A function to init the global layout. It is defined in web_project/__init__.py file
        context = TemplateLayout.init(self, super().get_context_data(**kwargs))

        return context
