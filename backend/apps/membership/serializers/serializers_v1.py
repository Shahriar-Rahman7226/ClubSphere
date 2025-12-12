from rest_framework.serializers import *
from apps.membership.models import *
from rest_framework import serializers


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class MembershipSerializer(ModelSerializer):
    club_position = serializers.ChoiceField(choices=CLUB_POSITIONS)
    additional_club_position = serializers.ChoiceField(choices=ADDITIONAL_CLUB_POSITIONS)
    status = serializers.ChoiceField(choices=MEMBERSHIP_STATUS)
    
    class Meta:
        model = Membership
        fields = ['club', 'user', 'club_position', 'additional_club_position', 'status', 'recruitment_semester', 'remarks']