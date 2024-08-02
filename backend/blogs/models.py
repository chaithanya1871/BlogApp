from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.


def blog_upload_to(instance, filename):
    return f"{instance.user_id}/{filename}"


class Blog(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'draft', 'DRAFT'
        PUBLISH = 'publish', 'PUBLISH'

    class Category(models.TextChoices):
        ARTS = 'arts', 'ARTS'
        GAMES = 'games', 'GAMES'
        HOME = 'home', 'HOME'
        HEALTH = 'health', 'HEALTH'
        TECHNOLOGY = 'technology', 'TECHNOLOGY'
        RECREATION = 'recreation', 'RECREATION'
        BUSINESS = 'business', 'BUSINESS'
        SOCIETY = 'society', 'SOCIETY'
        SPORTS = 'sports', 'SPORTS'
        SCIENCE = 'science', 'SCIENCE'

    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    category = models.CharField(max_length=100, choices=Category.choices)
    description = models.TextField()
    preview_image = models.FileField(upload_to=blog_upload_to, null=True, blank=True)
    status = models.CharField(max_length=100, choices=Status.choices)
    is_saved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    class Meta:
        db_table = 'blog'


class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'comment'


class Applaud(models.Model):
    blog = models.ForeignKey(
        Blog, on_delete=models.CASCADE, related_name='applauds')
    user = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'applaud'
