from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from apps.user.views import (
    UserInfoView, EbVerifyEmailView
)

router = DefaultRouter()
# router.register('profile', UserProfileViewset)
urlpatterns = router.urls

app_name = 'apps.auth'

urlpatterns += [
    path(f"", include("dj_rest_auth.urls")),

    re_path(r'registration/account-confirm-email/(?P<key>[-:\w]+)',
            EbVerifyEmailView.as_view(), name='account_confirm_email'),

    path('user-info/', UserInfoView.as_view(), name='user-info'),
]
