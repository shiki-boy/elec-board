from django.shortcuts import redirect
from django.utils.translation import gettext_lazy as _

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView
from rest_framework.permissions import IsAuthenticated

from apps.user.serializers import (
    RegisterSerializer,
    UserProfileSerializer,
)
from apps.user.models import User


class EbRegisterView(RegisterView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(self.get_response_data(user),
                        status=status.HTTP_201_CREATED,
                        headers=headers)


class EbVerifyEmailView(VerifyEmailView):

    def get(self, request, *args, **kwargs):
        kwargs.update(request.data)
        serializer = self.get_serializer(data=kwargs)
        serializer.is_valid(raise_exception=True)
        self.kwargs['key'] = serializer.validated_data['key']
        confirmation = self.get_object()
        confirmation.confirm(self.request)
        user = confirmation.email_address.user
        return redirect("/")


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.objects.filter(email=request.user.email).first()
        return Response({
            **user.info,
        }, status=status.HTTP_200_OK)


class UserProfileViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()
    lookup_field = 'uid'
    lookup_url_kwarg = "uid"
    lookup_value_regix = "[0-9a-f-]{36}"
