from django.urls import path
from .views import SignUpView, UserList, UserDetail

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('api/v1/users/', UserList.as_view()),
    path('api/v1/users/<int:pk>/', UserDetail.as_view()),
]
