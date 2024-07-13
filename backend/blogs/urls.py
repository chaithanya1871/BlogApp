from rest_framework.routers import DefaultRouter

from .views import BlogAPI, CommentAPI, ApplaudAPI

router = DefaultRouter()
router.register('blog', BlogAPI, basename='blog')
router.register('comment', CommentAPI, basename='comment')
router.register('applaud', ApplaudAPI, basename='applaud')

urlpatterns = [

]
urlpatterns += router.urls
