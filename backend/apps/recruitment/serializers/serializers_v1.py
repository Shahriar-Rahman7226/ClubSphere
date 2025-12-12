from rest_framework.serializers import *
from apps.recruitment.models import *


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class RecruitmentSerializer(ModelSerializer):
    
    class Meta:
        model = Recruitment
        fields = ['club', 'title', 'description', 'semester',  'start_date' , 'end_date', 'form_link']