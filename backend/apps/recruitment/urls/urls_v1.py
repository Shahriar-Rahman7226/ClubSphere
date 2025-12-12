from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.recruitment.views.views_v1 import *

router = DefaultRouter()
router.register('post', RecruitmentViewSet, basename='post')

urlpatterns = [
                  path(r'', include(router.urls)),
              ] 