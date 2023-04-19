from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import mixins, permissions, viewsets

from django_filters.rest_framework import DjangoFilterBackend

from .models import Application
from .serializers import ApplicationSerializer


class ApplicationViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = permissions.IsAuthenticated
    serializer_class = ApplicationSerializer
    # filter_fields = {}
    queryset = Application.objects.all().order_by("-modified")
    lookup_field = "uid"
    lookup_url_kwarg = "uid"
    lookup_value_regex = "[0-9a-f-]{36}"
    filter_backends = [OrderingFilter, SearchFilter, DjangoFilterBackend]
    ordering = ["created", "modified"]
    search_fields = ["id_number"]
