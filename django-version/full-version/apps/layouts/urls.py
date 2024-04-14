from django.urls import path
from .views import (
    CollapsedMenuView,
    ContentNavSidebarView,
    VerticalView,
    HorizontalView,
    WithoutMenuView,
    WithoutNavView,
    FluidView,
    ContainerView,
    BlankView,
)
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "layouts/collapsed_menu/",
        login_required(CollapsedMenuView.as_view(template_name="layouts_collapsed_menu.html")),
        name="layouts-collapsed-menu",
    ),
    path(
        "layouts/content_navbar/",
        login_required(VerticalView.as_view(template_name="layouts_content_navbar.html")),
        name="layouts-content-navbar",
    ),
    path(
        "layouts/content_nav_sidebar/",
        login_required(ContentNavSidebarView.as_view(template_name="layouts_content_navbar_with_sidebar.html")),
        name="layouts-content-nav-sidebar",
    ),
    path(
        "layouts/horizontal/",
        login_required(HorizontalView.as_view(template_name="layouts_horizontal.html")),
        name="layouts-horizontal",
    ),
    path(
        "layouts/without_menu/",
        login_required(WithoutMenuView.as_view(template_name="layouts_without_menu.html")),
        name="layouts-without-menu",
    ),
    path(
        "layouts/without_navbar/",
        login_required(WithoutNavView.as_view(template_name="layouts_without_navbar.html")),
        name="layouts-without-navbar",
    ),
    path(
        "layouts/fluid/",
        login_required(FluidView.as_view(template_name="layouts_fluid.html")),
        name="layouts-fluid",
    ),
    path(
        "layouts/container/",
        login_required(ContainerView.as_view(template_name="layouts_container.html")),
        name="layouts-container",
    ),
    path(
        "layouts/blank/",
        login_required(BlankView.as_view(template_name="layouts_blank.html")),
        name="layouts-blank",
    ),
]
