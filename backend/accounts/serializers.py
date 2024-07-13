from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserSerializer(serializers.ModelSerializer):

    def validate(self, data):
        password = data.get('password', None)

        if password and (len(password) < 6 or len(password) > 12):
            raise ValidationError(
                {'password': 'Password must be in between 6 to 12 characters (inclusive)'})

        return data

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        return UserSerializer.Meta.model.objects.create_user(email, password, **validated_data)

    def update(self, instance, validated_data):
        pass

    class Meta:
        model = get_user_model()
        fields = ['username', 'email',
                  'password', 'profile_image', 'date_joined']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user'] = user.username
        return token


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']
