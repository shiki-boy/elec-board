from rest_framework import serializers

from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.SerializerMethodField()
    reviewer_name = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = (
            "uid",
            "id_number",
            "ownership",
            "category",
            "load_applied",
            "approval_date",
            "status",
            "comments",
            "state",
            "district",
            "pin_code",
            "govt_id_type",
            "created",
            "modified",
            "applicant_name",
            "reviewer_name",
        )

    def get_applicant_name(self, obj):
        return obj.applicant.full_name

    def get_reviewer_name(self, obj):
        if not obj.reviewer:
            return None
        return obj.reviewer.full_name
