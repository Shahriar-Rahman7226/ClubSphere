from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.university.views.views_v1 import *

router = DefaultRouter()
router.register('university', UniversityViewSet, basename='university')
urlpatterns = [
                  path(r'', include(router.urls)),
              ]