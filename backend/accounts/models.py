from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin

from .managers import CustomUserManager


def upload_to_path():
    pass


class User(AbstractUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    date_joined = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    profile_image = models.FileField(upload_to=upload_to_path, null=True, blank=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    objects = CustomUserManager()

    def __str__(self):
        return self.username
