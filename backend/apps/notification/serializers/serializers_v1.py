from rest_framework.serializers import *
from apps.notification.models import *
from rest_framework import serializers


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class NotificationSerializer(ModelSerializer):
    audience = serializers.ChoiceField(choices=AUDIENCE)
    
    class Meta:
        model = Notification
        fields = ['club', ' user', 'event', 'post', 'title', 'message', 'audience']