from rest_framework.serializers import *
from apps.post.models import *
from rest_framework import serializers


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class PostSerializer(ModelSerializer):
    post_audience = serializers.ChoiceField(choices=AUDIENCE)
    
    class Meta:
        model = Post
        fields = ['club', 'title', 'description', 'image', 'react_count', 'post_audience']