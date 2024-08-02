from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import BlogAPI, CommentAPI, ApplaudAPI, BlogListAPI

router = DefaultRouter()
router.register('blog', BlogAPI, basename='blog')
router.register('comment', CommentAPI, basename='comment')
router.register('applaud', ApplaudAPI, basename='applaud')
router.register('list/blog',BlogListAPI, basename='blogs-list')
urlpatterns = [
]
urlpatterns += router.urls
