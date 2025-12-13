from rest_framework.serializers import *
from apps.university.models import *


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class UniversitySerializer(ModelSerializer):

    class Meta:
        model = University
        fields = ['id', 'title', 'email_domain', 'logo']
