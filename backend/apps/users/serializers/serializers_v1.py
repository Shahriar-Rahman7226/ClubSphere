from rest_framework import serializers
from rest_framework.serializers import *
from apps.users.models import *


exclude_list = [
    'is_active',
    'created_at',
    'updated_at'
]


class UserSerializer(ModelSerializer):
    password = CharField(max_length=128, allow_blank=False, allow_null=False)
    user_role = serializers.ChoiceField(choices=USER_ROLES)
    gender = serializers.ChoiceField(choices=GENDER)
    blood_group = serializers.ChoiceField(choices=BLOOD_GROUPS)
    
    class Meta:
        model = User
        fields = ['university', 'first_name', 'last_name', 'institution_id', 'email', 'phone_number', 'additional_email', 'department', 'description', 'profile_image', 'blood_group', 'DOB', 'gender', 'password', 'user_role']

class UserListSerializer(ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = [
            'is_active',
            'is_superuser',
            'last_login',
            'created_at',
            'updated_at',
            'login_attempt',
            'user_permissions',
            'groups',
            'two_factor',
            'first_name',
            'last_name',
            'password',
        ]
    
    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
