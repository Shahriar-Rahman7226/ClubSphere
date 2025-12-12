from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.users.views.views_v1 import *

router = DefaultRouter()
router.register('user-registration', UserResgistrationViewSet, basename='user_registration')
router.register('user-update-list', UserUpdateAndListViewSet, basename='user_update_list')

urlpatterns = [
                  path(r'', include(router.urls)),
                  path('create-admin/', UserResgistrationViewSet.as_view({'post': 'create_admin'})),
                  path('create-super-admin/', UserResgistrationViewSet.as_view({'post': 'create_super_admin'})),
              ] 