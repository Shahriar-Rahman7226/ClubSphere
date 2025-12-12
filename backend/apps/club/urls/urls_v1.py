from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.club.views.views_v1 import *

router = DefaultRouter()
router.register('club', ClubViewSet, basename='club')

urlpatterns = [
                  path(r'', include(router.urls)),
                  path('update-admin/', ClubViewSet.as_view({'post': 'update_admin'})),
              ] 