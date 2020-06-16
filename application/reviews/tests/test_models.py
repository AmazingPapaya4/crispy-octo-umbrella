from django.test import TestCase
from users.models import CustomUser
from reviews.models import Review, Feedback

class ReviewTest(TestCase):
    """
    Test module for Review model
    """

    def setUp(self):
        user = CustomUser.objects.create(
            username='testuser',
            is_admin=True,
            full_name='Test User'
        )
        Review.objects.create(
            employee=user,
        )

    def test_create_review(self):
        review = Review.objects.latest('created_at')
        self.assertEqual(review.employee.username, 'testuser')


class FeedbackTest(TestCase):
    """
    Test module for Feedback model
    """

    def setUp(self):
        user = CustomUser.objects.create(
            username='testuser',
            is_admin=True,
            full_name='Test User'
        )
        user_to_assign_1 = CustomUser.objects.create(
            username='testuser2',
            is_admin=False,
            full_name='Test User'
        )
        user_to_assign_2 = CustomUser.objects.create(
            username='testuser3',
            is_admin=False,
            full_name='Test User'
        )
        review = Review.objects.create(
            employee=user,
        )
        Feedback.objects.create(
            review=review,
            assignee=user_to_assign_1,
        )
        Feedback.objects.create(
            review=review,
            assignee=user_to_assign_2,
        )

    def test_create_review(self):
        review = Review.objects.latest('created_at')
        feedbacks = Feedback.objects.filter(
            review__id=review.id
        )
        self.assertEqual(feedbacks[0].review.employee.username, 'testuser')
        self.assertEqual(feedbacks[1].review.employee.username, 'testuser')
