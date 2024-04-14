from django.utils.safestring import mark_safe
from django import template
from web_project.templatehelpers.theme import TemplateHelper

register = template.Library()


# Register tags as an adapter for the Theme class usage in the HTML template


@register.simple_tag
def getThemeVariables(scope):
    return mark_safe(TemplateHelper.getThemeVariables(scope))


@register.simple_tag
def getThemeConfig(scope):
    return mark_safe(TemplateHelper.getThemeConfig(scope))


@register.simple_tag
def asset(path):
    return TemplateHelper.asset(path)


@register.filter
def filter_by_url(submenu, url):
    if submenu:
        for subitem in submenu:
            if (
                subitem.get("url") == url.path
                or subitem.get("url") == url.resolver_match.url_name
            ):
                return True
            # Recursively check for submenus
            elif subitem.get("submenu"):
                if filter_by_url(subitem["submenu"], url):
                    return True
        return False
    else:
        return False
