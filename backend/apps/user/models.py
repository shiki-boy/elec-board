from uuid import uuid4
from phonenumber_field.modelfields import PhoneNumberField

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone
from django.conf import settings


class UserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        user = self.model(
            email=self.normalize_email(email),
            is_active=True,
            is_staff=is_staff,
            is_superuser=is_superuser,
            last_login=timezone.now(),
            registered_at=timezone.now(),
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        is_staff = extra_fields.pop("is_staff", False)
        is_superuser = extra_fields.pop("is_superuser", False)
        return self._create_user(
            email, password, is_staff, is_superuser, **extra_fields
        )

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(
            email, password, is_staff=True, is_superuser=True, **extra_fields
        )


class User(AbstractBaseUser, PermissionsMixin):
    class GENDER_CHOICES(models.TextChoices):
        MALE = 'M'
        FEMALE = 'F'

    uid = models.UUIDField(unique=True, default=uuid4, editable=False)
    email = models.EmailField(verbose_name="Email", unique=True, max_length=128)
    first_name = models.CharField(
        verbose_name="First name", max_length=32, default="", blank=True
    )
    last_name = models.CharField(
        verbose_name="Last name", max_length=32, default="", blank=True
    )
    phone_number = PhoneNumberField(null=True, blank=True)
    is_active = models.BooleanField(verbose_name="Active", default=True)
    is_staff = models.BooleanField(verbose_name="Staff", default=False)
    registered_at = models.DateTimeField(
        verbose_name="Registered at", auto_now_add=timezone.now
    )
    modified = models.DateTimeField(auto_now=True)
    # gender = models.CharField(max_length=1, choices=GENDER_CHOICES.choices, blank=True)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    objects = UserManager()

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    @property
    def is_applicant(self):
        return bool(self.groups.count()) and self.groups.first().name == settings.APPLICANT_USER_GROUP

    @property
    def is_reviewer(self):
        return bool(self.groups.count()) and self.groups.first().name == settings.REVIEWER_USER_GROUP

    @property
    def is_admin(self):
        return self.is_superuser

    @property
    def info(self):
        return {
            "uid": self.uid,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "full_name": self.full_name,
            "phone_number": self.phone_number
            and getattr(self.phone_number, "raw_input", ""),
            "registered_at": self.registered_at,
            'is_reviewer': self.is_reviewer,
            'is_admin': self.is_admin,
            'is_applicant': self.is_applicant,
        }

    def __str__(self):
        return self.email


class ApplicantManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(groups__name=settings.APPLICANT_USER_GROUP)


class ReviewerManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(groups__name=settings.REVIEWER_USER_GROUP)


class Applicant(User):
    objects = ApplicantManager()

    class Meta:
        proxy = True


class Reviewer(User):
    objects = ReviewerManager()

    class Meta:
        proxy = True
