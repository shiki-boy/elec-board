from rest_framework.routers import DefaultRouter

from .views import ApplicationViewset

router = DefaultRouter()

router.register("", ApplicationViewset)

urlpatterns = []

urlpatterns += router.urls
