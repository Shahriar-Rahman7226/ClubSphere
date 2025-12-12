from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.post.views.views_v1 import *

router = DefaultRouter()
router.register('post', PostViewSet, basename='post')

urlpatterns = [
                  path(r'', include(router.urls)),
              ] 