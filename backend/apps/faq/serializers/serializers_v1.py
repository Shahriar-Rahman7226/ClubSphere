from rest_framework.serializers import *
from apps.faq.models import *


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class FAQSerializer(ModelSerializer):
    
    class Meta:
        model = FAQ
        fields = ['question', 'answer']