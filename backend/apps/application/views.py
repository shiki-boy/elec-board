from pandas import read_csv
from datetime import datetime
from calendar import month_name

from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import mixins, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend
from django.db.models.aggregates import Count

from apps.util.permissions import IsReviewer
from apps.user.models import Applicant, Reviewer

from .models import Application
from .serializers import ApplicationSerializer


def get_choice_value(val, type):
    d = {}
    for k, v in dict(getattr(Application, type).choices).items():
        # CONNECTION RELEASED and VOTER_ID in csv
        v = v.upper().replace(" ", "_") if type == "GOVT_ID_TYPE_CHOICES" else v.upper()
        d[v] = k
    return d[val.upper() if hasattr(val, "upper") else val]


def parse_date(val):
    try:
        return datetime.strptime(val, "%d-%m-%y")
    except TypeError:
        return None


class ApplicationViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = [permissions.IsAuthenticated, IsReviewer]
    serializer_class = ApplicationSerializer
    filterset_fields = {
        'status': ['exact', 'in'],
        'category': ['exact'],
        'created': ['gte', 'lte'],
    }
    queryset = Application.objects.all()
    lookup_field = "uid"
    lookup_url_kwarg = "uid"
    lookup_value_regex = "[0-9a-f-]{36}"
    filter_backends = [OrderingFilter, SearchFilter, DjangoFilterBackend]
    ordering = ["created", "modified"]
    search_fields = ["id_number"]

    def get_queryset(self):
        return super().get_queryset().filter(reviewer=self.request.user)

    @action(detail=False, methods=["GET"], url_path="stats", url_name="stats")
    def stats(self, request, *args, **kwargs):
        year = request.query_params.get("year", datetime.now().year)
        by = request.query_params.get("by")
        status = request.query_params.get("status", None)
        results = []
        extra_filters = {}

        if status:
            extra_filters["status"] = status

        qs = self.get_queryset().filter(**extra_filters)

        if by == "month":
            for i in range(1, 13):
                count = qs.filter(created__month=i, created__year=year).count()
                d = {"count": count, "month": month_name[i][:3]}
                results.append(d)

        elif by == "year":
            results = {}
            results["year"] = year
            results["total_count"] = qs.filter(created__year=year).count()

        return Response({"results": results})

    @action(detail=False, methods=["GET"], url_path="stats/status-counts", url_name="status-counts-stats")
    def status_counts(self, request, *args, **kwargs):
        year = request.query_params.get("year", datetime.now().year)
        qs = self.get_queryset().filter(created__year=year)
        data = qs.values('status').annotate(status_count=Count('status'))
        return Response(data)

    @action(
        detail=False, methods=["POST"], url_path="bulk-import", url_name="bulk-import"
    )
    def bulk_import(self, request, *args, **kwargs):
        # TODO: celery task
        file = request.FILES["file"]
        data_frame = read_csv(file)

        column_mapping = {
            "ID": 0,
            "Applicant_uid": 1,
            "Applicant_Name": 2,
            "Gender": 3,
            "District": 4,
            "State": 5,
            "Pincode": 6,
            "Ownership": 7,
            "GovtID_Type": 8,
            "ID_Number": 9,
            "Category": 10,
            "Load_Applied (in KV)": 11,
            "Date_of_Application": 12,
            "Date_of_Approval": 13,
            "Modified_Date": 14,
            "Status": 15,
            "Reviewer_ID": 16,
            "Reviewer_uid": 17,
            "Reviewer_Name": 18,
            "Reviewer_Comments": 19,
        }

        for row in data_frame.values:
            applicant_uid = row[column_mapping["Applicant_uid"]]
            reviewer_uid = row[column_mapping["Reviewer_uid"]]

            applicant = Applicant.objects.get(uid=applicant_uid)
            reviewer = Reviewer.objects.get(uid=reviewer_uid)

            data = {
                "applicant": applicant,
                "reviewer": reviewer,
                "id_number": row[column_mapping["ID_Number"]],
                "ownership": get_choice_value(
                    row[column_mapping["Ownership"]], "OWNERSHIP_CHOICES"
                ),
                "category": get_choice_value(
                    row[column_mapping["Category"]], "CATEGORY_CHOICES"
                ),
                "load_applied": row[column_mapping["Load_Applied (in KV)"]],
                "approval_date": parse_date(row[column_mapping["Date_of_Approval"]]),
                "status": get_choice_value(
                    row[column_mapping["Status"]], "STATUS_CHOICES"
                ),
                "comments": row[column_mapping["Reviewer_Comments"]],
                "state": row[column_mapping["State"]],
                "district": row[column_mapping["District"]],
                "pin_code": row[column_mapping["Pincode"]],
                "govt_id_type": get_choice_value(
                    row[column_mapping["GovtID_Type"]], "GOVT_ID_TYPE_CHOICES"
                ),
                "created": parse_date(row[column_mapping["Date_of_Application"]]),
                "modified": parse_date(row[column_mapping["Modified_Date"]]),
            }
            Application.objects.create(**data)
        return Response()
