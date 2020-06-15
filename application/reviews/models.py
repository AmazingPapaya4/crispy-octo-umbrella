from django.db import models
from users.models import CustomUser


class Review(models.Model):
    """
    Performance reviews for employees.
    """
    # Employee that is being reviewed
    employee = models.ForeignKey(
        CustomUser,
        related_name='reviews',
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']


class Feedback(models.Model):
    """
    Assigned feedbacks for review.
    """
    # Review that feedback is related to
    review = models.ForeignKey(
        Review,
        related_name='feedbacks',
        on_delete=models.CASCADE,
    )
    # Assigned employee to give feedback
    assignee = models.ForeignKey(
        CustomUser,
        related_name='feedbacks',
        on_delete=models.CASCADE,
    )
    # Feedback message given by assignee
    message = models.CharField(
        max_length=255,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
