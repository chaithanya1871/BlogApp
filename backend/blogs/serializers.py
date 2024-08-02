from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Blog, Comment, Applaud


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ['password']


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"


class ApplaudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applaud
        fields = "__all__"


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class BlogDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    applauds = ApplaudSerializer(read_only=True, many=True)
    comments = CommentCreateSerializer(read_only=True, many=True)

    class Meta:
        model = Blog
        fields = "__all__"


class CommentDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    blog = BlogSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
