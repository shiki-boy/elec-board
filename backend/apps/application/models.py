from django.db import models
from django.core.validators import MaxValueValidator

from apps.util.models import AbstractBaseModel
from apps.user.models import Applicant, Reviewer


class Application(AbstractBaseModel):
    class OWNERSHIP_CHOICES(models.TextChoices):
        JOINT = "J"
        INDIVIDUAL = "I"

    class CATEGORY_CHOICES(models.TextChoices):
        COMMERICAL = "C"
        RESIDENTIAL = "R"

    class STATUS_CHOICES(models.TextChoices):
        PENDING = "P"
        REJECTED = "R"
        CONNECTION_RELEASED = "C"
        APPROVED = "A"
    
    class GOVT_ID_TYPE_CHOICES(models.IntegerChoices):
        PAN = 0
        AADHAR = 1
        VOTER_ID = 2
        PASSPORT = 3

    applicant = models.ForeignKey(
        Applicant, related_name="applications", on_delete=models.CASCADE
    )
    reviewer = models.ForeignKey(
        Reviewer,
        related_name="assigned_applications",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    id_number = models.PositiveBigIntegerField()
    ownership = models.CharField(max_length=1, choices=OWNERSHIP_CHOICES.choices)
    category = models.CharField(max_length=1, choices=CATEGORY_CHOICES.choices)
    load_applied = models.PositiveIntegerField(
        verbose_name="Load Applied (in KV)",
        validators=[
            MaxValueValidator(200),
        ],
    )
    approval_date = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES.choices, default=STATUS_CHOICES.PENDING
    )
    comments = models.TextField(blank=True)
    state = models.CharField(max_length=32, blank=True)
    district = models.CharField(max_length=32, blank=True)
    pin_code = models.CharField(max_length=16, blank=True)
    govt_id_type = models.IntegerField(choices=GOVT_ID_TYPE_CHOICES.choices)
    created = models.DateTimeField(verbose_name='Date of application')
    modified = models.DateTimeField()
