import django_filters

from .models import Comment, Blog, Applaud


class CommentFilter(django_filters.FilterSet):
    class Meta:
        model = Comment
        fields = ['blog_id']


class BlogFilter(django_filters.FilterSet):
    class Meta:
        model = Blog
        fields = ['user', 'is_saved','category']


class ApplaudFilter(django_filters.FilterSet):
    class Meta:
        model = Applaud
        fields = ['user', 'blog_id']