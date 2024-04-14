from django.conf import settings
from pprint import pprint
import os
from django.templatetags.static import static
from importlib import import_module, util


# Core TemplateHelper class
class TemplateHelper:
    # Init the Template Context using TEMPLATE_CONFIG
    def initContext(context):
        context.update(
            {
                "layout": settings.TEMPLATE_CONFIG.get("layout"),
                "theme": settings.TEMPLATE_CONFIG.get("theme"),
                "style": settings.TEMPLATE_CONFIG.get("style"),
                "rtlSupport": settings.TEMPLATE_CONFIG.get("rtlSupport"),
                "rtlMode": settings.TEMPLATE_CONFIG.get("rtlMode"),
                "hasCustomizer": settings.TEMPLATE_CONFIG.get("hasCustomizer"),
                "displayCustomizer": settings.TEMPLATE_CONFIG.get("displayCustomizer"),
                "contentLayout": settings.TEMPLATE_CONFIG.get("contentLayout"),
                "navbarType": settings.TEMPLATE_CONFIG.get("navbarType"),
                "headerType": settings.TEMPLATE_CONFIG.get("headerType"),
                "menuFixed": settings.TEMPLATE_CONFIG.get("menuFixed"),
                "menuCollapsed": settings.TEMPLATE_CONFIG.get("menuCollapsed"),
                "footerFixed": settings.TEMPLATE_CONFIG.get("footerFixed"),
                "showDropdownOnHover": settings.TEMPLATE_CONFIG.get(
                    "showDropdownOnHover"
                ),
                "customizerControls": settings.TEMPLATE_CONFIG.get(
                    "customizerControls"
                ),
            }
        )
        return context

    # ? Map context variables to template class/value/variables names
    def mapContext(context):
        #! Header Type (horizontal support only)
        if context.get("layout") == "horizontal":
            if context.get("headerType") == "fixed":
                context["headerTypeClass"] = "layout-menu-fixed"
            elif context.get("headerType") == "static":
                context["headerTypeClass"] = ""
            else:
                context["headerTypeClass"] = ""
        else:
            context["headerTypeClass"] = ""

        #! Navbar Type (vertical/front support only)
        if context.get("layout") != "horizontal":
            if context.get("navbarType") == "fixed":
                context["navbarTypeClass"] = "layout-navbar-fixed"
            elif context.get("navbarType") == "static":
                context["navbarTypeClass"] = ""
            else:
                context["navbarTypeClass"] = "layout-navbar-hidden"
        else:
            context["navbarTypeClass"] = ""

        # Menu collapsed
        if context.get("menuCollapsed") == True:
            context["menuCollapsedClass"] = "layout-menu-collapsed"
        else:
            context["menuCollapsedClass"] = ""

        #! Menu Fixed (vertical support only)
        if context.get("layout") == "vertical":
            if context.get("menuFixed") == True:
                context["menuFixedClass"] = "layout-menu-fixed"
            else:
                context["menuFixedClass"] = ""

        # Footer Fixed
        if context.get("footerFixed") == True:
            context["footerFixedClass"] = "layout-footer-fixed"
        else:
            context["footerFixedClass"] = ""

        # RTL Supported template
        if context.get("rtlSupport") == True:
            context["rtlSupportValue"] = "/rtl"

        # RTL Mode/Layout
        if context.get("rtlMode") == True:
            context["rtlModeValue"] = "rtl"
            context["textDirectionValue"] = "rtl"
        else:
            context["rtlModeValue"] = "ltr"
            context["textDirectionValue"] = "ltr"

        #!  Show dropdown on hover (Horizontal menu)
        if context.get("showDropdownOnHover") == True:
            context["showDropdownOnHoverValue"] = "true"
        else:
            context["showDropdownOnHoverValue"] = "false"

        # Display Customizer
        if context.get("displayCustomizer") == True:
            context["displayCustomizerClass"] = ""
        else:
            context["displayCustomizerClass"] = "customizer-hide"

        # Content Layout
        if context.get("contentLayout") == "wide":
            context["containerClass"] = "container-fluid"
            context["contentLayoutClass"] = "layout-wide"
        else:
            context["containerClass"] = "container-xxl"
            context["contentLayoutClass"] = "layout-compact"

        ## Detached Navbar
        if context.get("navbarDetached") == True:
            context["navbarDetachedClass"] = "navbar-detached"
        else:
            context["navbarDetachedClass"] = ""

    # Get theme variables by scope
    def getThemeVariables(scope):
        return settings.THEME_VARIABLES[scope]

    # Get theme config by scope
    def getThemeConfig(scope):
        return settings.TEMPLATE_CONFIG[scope]

    # Get an assets path in assets folder by path
    def asset(path):
        return static(path)

    # Set the current page layout and init the layout bootstrap file
    def setLayout(view, context={}):
        layout = os.path.splitext(view)[0]
        layout = layout.split("/")[0]

        # Get module path
        module = "templates.{}.bootstrap.{}".format(
            settings.THEME_LAYOUT_DIR.replace("/", "."), layout
        )

        # Check if the bootstrap file is exist
        if not util.find_spec(module) == None:
            # Auto import and init the default bootstrap.py file from the theme
            TemplateBootstrap = TemplateHelper.importClass(
                module, "TemplateBootstrap{}".format(layout.title().replace("-", ""))
            )
            TemplateBootstrap.init(context)
        else:
            module = "templates.{}.bootstrap.default".format(
                settings.THEME_LAYOUT_DIR.replace("/", ".")
            )
            TemplateBootstrap = TemplateHelper.importClass(
                module, "TemplateBootstrapDefault"
            )
            TemplateBootstrap.init(context)

        return "{}/{}".format(settings.THEME_LAYOUT_DIR, view)

    # Import a module by string
    def importClass(fromModule, importClassName):
        pprint("Loading {} from {}".format(importClassName, fromModule))
        module = import_module(fromModule)
        return getattr(module, importClassName)
