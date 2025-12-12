from drf_spectacular.utils import extend_schema, OpenApiExample
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from external.swagger_query_params import set_query_params
from external.pagination import CustomPagination
from apps.post.models import *
from apps.post.serializers.serializers_v1 import *
from django.db import transaction
from external.query_helper import get_query_data
from external.permission_decorator import allowed_users
from rest_framework import status

@extend_schema(tags=['Post'])
class PostViewSet(ModelViewSet):
    model_class = Post
    serializer_class = PostSerializer
    queryset = model_class.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    pagination_classes = CustomPagination
    lookup_field = 'id'
    
    @extend_schema(
        examples=[
            OpenApiExample(
                "Create Post",
                value={
                "club": "string",
                "title": "string",
                 "description": "string",
                "image": "file",
                 "post_audience": "string",
                },
                request_only=True,
            )
        ],
    )
    
    @transaction.atomic()
    @allowed_users(allowed_roles=['ADMIN'])
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Post created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @extend_schema(
        examples=[
            OpenApiExample(
                "Update Post",
                value={
                "title": "string",
                 "description": "string",
                "image": "file",
                 "post_audience": "string",
                },
                request_only=True,
            )
        ],
    )
    @transaction.atomic()
    @allowed_users(allowed_roles=['ADMIN'])
    def update(self, request, *args, **kwargs):
        instance = self.model_class.objects.filter(id=kwargs['id']).first()
        if not instance:
            return Response({'message': 'Invalid Post'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(instance=instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Post updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    @extend_schema(parameters=set_query_params('list', [
        {"club": 'club', "description": 'Filter by club'},
         {"post_audience": 'post_audience', "description": 'Filter by post audience'},

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
        obj = queryset.filter(id=kwargs['id']).first()
        if not obj:
            return Response({'message': 'Invalid Post'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)


