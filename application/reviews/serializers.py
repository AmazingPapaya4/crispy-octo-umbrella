from django.http import JsonResponse
from rest_framework import serializers
from reviews.models import Review, Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    """
    Serializer for all feedback APIs
    """
    reviewing = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Feedback
        fields = ['id', 'reviewing', 'assignee', 'message', 'review']

    def get_reviewing(self, obj):
    # Returns data of employee getting reviewed
        return obj.get_reviewing()

class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for all review APIs
    """
    feedbacks = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'employee', 'feedbacks']

    def get_feedbacks(self, obj):
    # Returns all feedbacks associated with the review
        return obj.get_feedbacks()
