from rest_framework import pagination
from django.conf import settings

DEFAULT_PAGINATION_SIZE = 10
DEFAULT_MAX_PAGINATION_SIZE = 50


class CustomPageNumberPagination(pagination.PageNumberPagination):
    """ Allows to pass `limit` to set the page_size in PageNumberPagination. """
    page_size = settings.REST_FRAMEWORK.get('PAGE_SIZE', DEFAULT_PAGINATION_SIZE)
    page_size_query_param = 'limit'
    max_page_size = settings.REST_FRAMEWORK.get('MAX_PAGE_SIZE', DEFAULT_MAX_PAGINATION_SIZE)

    def get_page_size(self, request):
        if self.page_size_query_param:
            try:
                return pagination._positive_int(
                    request.query_params[self.page_size_query_param],
                    strict=False,
                    cutoff=self.max_page_size
                )
            except (KeyError, ValueError):
                pass

        return self.page_size
