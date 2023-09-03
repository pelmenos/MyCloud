from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *


router = DefaultRouter()
router.register(r'files', FilesViewSet, basename="file")

urlpatterns = [
    path('users/', GetUser.as_view(), name='get_user'),
    path('register/', RegisterUser.as_view(), name='register_user'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),

    path('folders/', FolderView.as_view(), name='folder'),
    path('folders/<int:pk>', FolderDetailView.as_view(), name='folder_detail'),
]
