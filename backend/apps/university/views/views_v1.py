from drf_spectacular.utils import extend_schema, OpenApiExample
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from external.pagination import CustomPagination
from apps.university.models import *
from apps.university.serializers.serializers_v1 import *
from django.db import transaction
from external.permission_decorator import allowed_users
from rest_framework import status

@extend_schema(tags=['University'])
class UniversityViewSet(ModelViewSet):
    model_class = University
    serializer_class = UniversitySerializer
    queryset = model_class.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    pagination_classes = CustomPagination
    lookup_field = 'id'
    
    @extend_schema(
        examples=[
            OpenApiExample(
                "Create University",
                value={
                "title": "string",
                "email_domain": "@example.com",
                "logo": "file",
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'University created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @extend_schema(
        examples=[
            OpenApiExample(
                "Update Club",
                value={
                "title": "string",
                "email_domain": "@example.com",
                "logo": "file",
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    @allowed_users(allowed_roles=['SUPER_ADMIN'])
    def update(self, request, *args, **kwargs):
        instance = self.model_class.objects.filter(id=kwargs['id']).first()
        if not instance:
            return Response({'message': 'Invalid University'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(instance=instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'University updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.serializer_class(
                page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, *args, **kwargs):
        queryset = self.queryset
        obj = queryset.filter(id=kwargs['id']).first()
        if not obj:
            return Response({'message': 'Invalid University'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)


