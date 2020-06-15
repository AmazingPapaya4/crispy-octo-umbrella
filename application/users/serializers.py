from rest_framework import serializers
from users.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    feedbacks = serializers.StringRelatedField(many=True)
    reviews = serializers.StringRelatedField(many=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'feedbacks', 'reviews', 'is_admin',]
