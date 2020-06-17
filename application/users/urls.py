from django.urls import path
from .views import UserList, UserDetail

urlpatterns = [
    path('v1/users/', UserList.as_view()),
    path('v1/users/<int:pk>/', UserDetail.as_view()),
]
