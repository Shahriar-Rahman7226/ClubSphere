from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.membership.views.views_v1 import *

router = DefaultRouter()
router.register('memberhsip', MembershipViewSet, basename='membership')

urlpatterns = [
                  path(r'', include(router.urls)),
              ] 