from django.urls import path
from django.urls.conf import re_path
from . import views
from django.contrib import admin


app_name = 'users'

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', views.RegisterAPI.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', views.BlacklistTokenView.as_view()),
    # path('users/', views.UserList.as_view()),
    # path('fetchByEmail/', views.FetchByEmail.as_view()),
    # path('fetchByUsername/<String : username>', views.FetchByUsername.as_view()),
    # re_path(r'^users/(?P<pk>[0-9]+)/$',
    #     views.UserDetail.as_view()),
    # re_path(r'^users/(?P<username>[-a-zA-Z0-9_]+)/$',
    #     views.UserDetail.as_view()),
]