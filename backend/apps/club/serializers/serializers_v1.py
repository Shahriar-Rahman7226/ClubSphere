from rest_framework.serializers import *
from apps.club.models import *


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class ClubSerializer(ModelSerializer):
    
    class Meta:
        model = Club
        fields = ['university', 'user', 'title', 'description', 'logo', 'banner', 'email']