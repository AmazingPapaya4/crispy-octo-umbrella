from reviews.models import Review, Feedback
from reviews.serializers import ReviewSerializer, FeedbackSerializer
from rest_framework import generics, permissions

class IsOwnerOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Instance must have an attribute named `owner`.
        return obj.assignee == request.user

class IsAdminOnly(permissions.BasePermission):
    """
    Permission to only allow access to admins.
    Assumes the request.user.is_admin is True.
    """

    def has_permission(self, request, view):
        return request.user.is_admin

class ReviewList(generics.ListCreateAPIView):
    """
    Permission: admin only
    List and create reviews
    """
    permission_classes = [IsAdminOnly]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewDetail(generics.RetrieveUpdateAPIView):
    """
    Permission: admin only
    Update and view reviews
    """
    permission_classes = [IsAdminOnly]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class FeedbackList(generics.ListCreateAPIView):
    """
    Permission: admin only
    Create feedback object for employees
    """
    permission_classes = [IsAdminOnly]
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

class FeedbackDetail(generics.RetrieveUpdateAPIView):
    """
    Permission: authenticated user, assignee.
    Update and view feedback
    """
    permission_classes = [IsOwnerOnly]
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
