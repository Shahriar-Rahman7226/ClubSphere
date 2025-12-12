from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.faq.views.views_v1 import *

router = DefaultRouter()
router.register('FAQ', FAQViewSet, basename='FAQ')

urlpatterns = [
                  path(r'', include(router.urls)),
              ] 