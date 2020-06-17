from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from users.models import CustomUser
from users.serializers import CustomUserSerializer
from rest_framework import generics, permissions

from .forms import CustomUserCreationForm

class IsAdminOnly(permissions.BasePermission):
    """
    Permission to only allow access to admins.
    Assumes the request.user.is_admin is True.
    """

    def has_permission(self, request, view):
        return request.user.is_admin

class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

class UserList(generics.ListCreateAPIView):
    permission_classes = [IsAdminOnly]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
