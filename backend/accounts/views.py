from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, \
    UpdateModelMixin
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import User
from .serializers import UserSerializer, UserDetailSerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND


# Create your views here.


class UserRegistrationAPI(GenericViewSet, CreateModelMixin):
    authentication_classes = []
    permission_classes = []
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        ser = self.serializer_class(data=data)
        if ser.is_valid(raise_exception=True):
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=HTTP_400_BAD_REQUEST)


class UserAPI(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, DestroyModelMixin,
              UpdateModelMixin):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return User.objects.all()

    def list(self, request, *args, **kwargs):
        try:
            user_id = request.user.id
            user_obj = User.objects.get(pk=user_id)
            user_serializer = UserDetailSerializer(instance=user_obj)
            return Response(user_serializer.data, status=HTTP_200_OK)
        except:
            return Response(data={'message': 'User does not exist'}, status=HTTP_404_NOT_FOUND)
