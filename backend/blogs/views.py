from django.db.models import Prefetch
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, \
    UpdateModelMixin
from rest_framework_simplejwt.authentication import JWTAuthentication

from .filters import CommentFilter, BlogFilter
from .models import Blog, Comment, Applaud
from .serializers import BlogSerializer, BlogDetailSerializer, CommentCreateSerializer, CommentDetailSerializer, \
    ApplaudSerializer


# Create your views here.


class BlogAPI(GenericViewSet, ListModelMixin, CreateModelMixin, RetrieveModelMixin, DestroyModelMixin,
              UpdateModelMixin):
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter,)
    filterset_class = BlogFilter

    def get_serializer_class(self):
        if self.action in ["create", "list"]:
            return BlogSerializer
        return BlogDetailSerializer

    def get_queryset(self):
        return Blog.objects.prefetch_related(Prefetch('user'))


class CommentAPI(GenericViewSet, ListModelMixin, CreateModelMixin, DestroyModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter,)
    filterset_class = CommentFilter

    def get_serializer_class(self):
        if self.action == "create":
            return CommentCreateSerializer
        return CommentDetailSerializer

    def get_queryset(self):
        return Comment.objects.all()


class ApplaudAPI(GenericViewSet, ListModelMixin, CreateModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = ApplaudSerializer

    def get_queryset(self):
        return Applaud.objects.all()
