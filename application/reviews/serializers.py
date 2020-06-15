from rest_framework import serializers
from reviews.models import Review, Feedback

class ReviewSerializer(serializers.ModelSerializer):
    feedbacks = serializers.StringRelatedField(many=True)

    class Meta:
        model = Review
        fields = ['id', 'employee', 'feedbacks']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'review', 'assignee', 'message']
