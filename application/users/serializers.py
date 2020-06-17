from rest_framework import serializers
from users.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    feedbacks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    reviews = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'feedbacks', 'reviews', 'is_admin',]
