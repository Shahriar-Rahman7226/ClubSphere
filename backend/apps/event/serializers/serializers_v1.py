from rest_framework.serializers import *
from apps.event.models import *
from rest_framework import serializers


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class EventSerializer(ModelSerializer):
    event_audience = serializers.ChoiceField(choices=AUDIENCE)
    status = serializers.ChoiceField(choices=EVENT_STATUS)
    
    class Meta:
        model = Event
        fields = ['club', 'title', 'description', 'start_date', 'end_date', 'start_time', 'end_time', 'image', 'location', 'registration_link', 'event_audience', 'status']