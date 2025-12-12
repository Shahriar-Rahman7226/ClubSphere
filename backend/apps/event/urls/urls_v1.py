from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.event.views.views_v1 import *

router = DefaultRouter()
router.register('event', EventViewSet, basename='event')

urlpatterns = [
                  path(r'', include(router.urls)),
              ] 