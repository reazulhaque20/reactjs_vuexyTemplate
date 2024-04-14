from django.urls import path
from .views import AcademyView
from django.contrib.auth.decorators import login_required


urlpatterns = [
    path(
        "app/academy/dashboard/",
        login_required(AcademyView.as_view(template_name="app_academy_dashboard.html")),
        name="app-academy-dashboard",
    ),
    path(
        "app/academy/course/",
        login_required(AcademyView.as_view(template_name="app_academy_course.html")),
        name="app-academy-course",
    ),
    path(
        "app/academy/course_details/",
        login_required(AcademyView.as_view(template_name="app_academy_course_details.html")),
        name="app-academy-course-details",
    ),
]
