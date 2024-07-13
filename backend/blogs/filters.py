import django_filters

from .models import Comment, Blog


class CommentFilter(django_filters.FilterSet):
    class Meta:
        model = Comment
        fields = ['blog_id']


class BlogFilter(django_filters.FilterSet):
    class Meta:
        model = Blog
        fields = ['user', 'is_saved','category']
