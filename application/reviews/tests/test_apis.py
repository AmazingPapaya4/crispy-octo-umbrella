import json
from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase
from django.urls import reverse
from users.models import CustomUser
from reviews.models import Review, Feedback
from reviews.serializers import ReviewSerializer, FeedbackSerializer


# initialize the APIClient app
client = APIClient()

class ReviewsApiTest(TestCase):
    """ Test module for reviews API """

    def setUp(self):
        user = CustomUser.objects.create(
            username='testuser',
            is_admin=True,
            full_name='Test User'
        )
        Review.objects.create(
            employee=user,
        )
        Review.objects.create(
            employee=user,
        )
        Review.objects.create(
            employee=user,
        )

    def test_get_all_reviews(self):
        user = CustomUser.objects.get(username='testuser')
        client.force_authenticate(user=user)
        # get API response
        response = client.get(reverse('reviews'))
        # get data from db
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
