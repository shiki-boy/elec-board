from dj_rest_auth.serializers import PasswordChangeSerializer
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from django.core.management import call_command
from django.db import transaction
from rest_framework import serializers

from apps.user.models import User
from apps.util.utils import send_email


class RegisterSerializer(serializers.ModelSerializer):
    invite_code = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name',
                  'phone', 'password', ]

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

    def save(self, request):
        return super().save()


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('uid', 'email', 'first_name', 'last_name')
        read_only_fields = ('email',)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('uid', 'email', 'first_name', 'last_name',
                  'phone_number', 'is_active', 'full_name')


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password']

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance


class EBPasswordChangeSerializer(PasswordChangeSerializer):

    def save(self):
        self.set_password_form.save()
        send_email(
            subject="Reset Password Successfully",
            recipient_email=[self.user.email],
            from_email=settings.DEFAULT_FROM_EMAIL,
            text_template_path="mail/reset_password_confirm.txt",
            html_template_path="mail/reset_password_confirm.html",
            merge_data={"first_name": self.user.first_name})
        if not self.logout_on_password_change:
            from django.contrib.auth import update_session_auth_hash
            update_session_auth_hash(self.request, self.user)
