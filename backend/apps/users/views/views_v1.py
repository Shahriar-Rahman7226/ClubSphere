from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import transaction
from drf_spectacular.utils import extend_schema, OpenApiExample
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from external.pagination import CustomPagination
from external.swagger_query_params import set_query_params
from apps.users.serializers.serializers_v1 import *
from apps.users.models import *
from external.send_message import send_email
from rest_framework import status
from external.permission_decorator import allowed_users
from external.query_helper import get_query_data
from django.db.models import Q

@extend_schema(tags=['User Registration'])
class UserResgistrationViewSet(ModelViewSet):
    model_class = User
    serializer_class = UserSerializer
    queryset = model_class.objects.all()
    pagination_classes = CustomPagination
    lookup_field = 'id'

    @extend_schema(
    examples=[
        OpenApiExample(
            "Create User",
            value={
                "university": "string",
                "first_name": "string",
                "last_name": "string",
                 "institution_id": "string",
                "email": "string",
                "additional_email": "string",
                "phone_number": "string",
                "department": "string",
                "description": "string",
                "gender": "string",
                "DOB": "string",
                "blood_group": "string",
                "profile_image": "file",
                "password": "string",
            },
            request_only=True,
            )
        ]
    )
    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        data = request.data

        # email check
        if self.model_class.objects.filter(Q(email=data['email']) | Q(additional_email=data['email'])).first():
            return Response({'message': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Additional email check
        if 'additional_email' in data and data['additional_email']:
            if self.model_class.objects.filter(Q(email=data['additional_email']) | Q(additional_email=data['additional_email'])).first():
                return Response({'message': 'Additional email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Phone Number Check
        if self.model_class.objects.filter(phone_number=data['phone_number']).first():
            return Response({'message': 'Phone number is already in use.'}, status=status.HTTP_400_)

        # Password check
        if 'password' in data.keys():
            try:
                validate_password(data['password'])
                data['password'] = make_password(data['password'])
            except ValidationError:
                return Response({'message': 'Given password is too weak.'}, status=status.HTTP_400_BAD_REQUEST)
            
        data['user_role'] = USER_ROLES[3][0]

        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            user_obj = serializer.save()
            subject = 'ClubSphere'
            message = 'Thankyou for registering with us!'
            send_email(user_obj.id, subject, message, None)
            # send_sms()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        

    @extend_schema(
        examples=[
            OpenApiExample(
                "Create Admin",
                value={
                "university": "string",
                "first_name": "string",
                "last_name": "string",
                 "institution_id": "string",
                "email": "string",
                "additional_email": "string",
                "phone_number": "string",
                "department": "string",
                "description": "string",
                "gender": "string",
                "DOB": "string",
                "blood_group": "string",
                "profile_image": "file",
                "password": "string",
                },
                request_only=True,
            )
        ]
    )
    @transaction.atomic()
    @allowed_users(allowed_roles=['SUPER_ADMIN'])
    def create_admin(self, request, *args, **kwargs):
        data = request.data

         # email check
        if self.model_class.objects.filter(Q(email=data['email']) | Q(additional_email=data['email'])).first():
            return Response({'message': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Additional email check
        if 'additional_email' in data and data['additional_email']:
            if self.model_class.objects.filter(Q(email=data['additional_email']) | Q(additional_email=data['additional_email'])).first():
                return Response({'message': 'Additional email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Phone Number Check
        if self.model_class.objects.filter(phone_number=data['phone_number']).first():
            return Response({'message': 'Phone number is already in use.'}, status=status.HTTP_400_)

        # Password check
        if 'password' in data.keys():
            try:
                validate_password(data['password'])
                data['password'] = make_password(data['password'])
            except ValidationError:
                return Response({'message': 'Given password is too weak.'}, status=status.HTTP_400_BAD_REQUEST)
            
        data['user_role'] = USER_ROLES[2][0]

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            user_obj = serializer.save()
            subject = 'ClubSphere'
            message = 'Thankyou for registering with us!'
            send_email(user_obj.id, subject, message, None)
            # send_sms()
            return Response({'message': 'Admin created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    @extend_schema(
        examples=[
            OpenApiExample(
                "Create Super Admin",
                value={
                "university": "string",
                "first_name": "string",
                "last_name": "string",
                 "institution_id": "string",
                "email": "string",
                "additional_email": "string",
                "phone_number": "string",
                "department": "string",
                "description": "string",
                "gender": "string",
                "DOB": "string",
                "blood_group": "string",
                "profile_image": "file",
                "password": "string",
                },
                request_only=True,
            )
        ]
    )
    @transaction.atomic()
    def create_super_admin(self, request, *args, **kwargs):
        data = request.data

         # email check
        if self.model_class.objects.filter(Q(email=data['email']) | Q(additional_email=data['email'])).first():
            return Response({'message': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

        # Additional email check
        if 'additional_email' in data and data['additional_email']:
            if self.model_class.objects.filter(Q(email=data['additional_email']) | Q(additional_email=data['additional_email'])).first():
                return Response({'message': 'Additional email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Phone Number Check
        if self.model_class.objects.filter(phone_number=data['phone_number']).first():
            return Response({'message': 'Phone number is already in use.'}, status=status.HTTP_400_)

        # Password check
        if 'password' in data.keys():
            try:
                validate_password(data['password'])
                data['password'] = make_password(data['password'])
            except ValidationError:
                return Response({'message': 'Given password is too weak.'}, status=status.HTTP_400_BAD_REQUEST)
            
        data['user_role'] = USER_ROLES[2][0]

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            user_obj = serializer.save()
            subject = 'ClubSphere'
            message = 'Thankyou for registering with us!'
            send_email(user_obj.id, subject, message, None)
            # send_sms()
            return Response({'message': 'Super Admin created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        





@extend_schema(tags=['User Update And List'])
class UserUpdateAndListViewSet(ModelViewSet):
    model_class = User
    serializer_class = UserListSerializer
    queryset = model_class.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    pagination_classes = CustomPagination
    lookup_field = 'id'
    
    @extend_schema(
        examples=[
            OpenApiExample(
                "Update User",
                value={
                "first_name": "string",
                "last_name": "string",
                 "instituiton_id": "string",
                "email": "string",
                "additional_email": "string",
                "phone_number": "string",
                "department": "string",
                "description": "string",
                "gender": "string",
                "DOB": "string",
                "blood_group": "string",
                "profile_image": "file",
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    def update(self, request, *args, **kwargs):
        data = request.data
        instance = self.queryset.filter(id=request.user.id).first()

        if not instance:
            return Response({'message': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Email check
        if 'email' in data.keys():
            if self.model_class.objects.filter(Q(email=data['email']) | Q(additional_email=data['email'])).first():
                return Response({'message': 'Email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)


        # Additional Email check
        if 'additional_email' in data.keys():
            if self.model_class.objects.filter(Q(email=data['additional_email']) | Q(additional_email=data['additional_email'])).first():
                return Response({'message': 'Additional email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

         # Phone Number check
        if 'phone_number' in data.keys():
            if self.model_class.objects.filter(phone_number=data['phone_number']).first():
                return Response({'message': 'Phone Number is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
            

        serializer_class = UserSerializer
        serializer = serializer_class(instance=instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            subject = 'ClubSphere'
            message = 'Your profile information was updated successfully.'
            send_email(None, subject, message, request.user.id)
            # send_sms()
            return Response({'message': 'User updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @extend_schema(parameters=set_query_params('list', [
        {"name": 'user_role', "description": 'Filter by user role'},
    ]))
    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        params = request.query_params
        if params:
            queryset=get_query_data(params, queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(
                page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    def retrieve(self, request, *args, **kwargs):
        queryset = self.queryset
        obj = queryset.filter(id=request.user.id).first()
        if not obj:
            return Response({'message': 'User does not exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)