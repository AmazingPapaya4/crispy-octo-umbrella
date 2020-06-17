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

    def get_feedbacks(self):
        feedbacks = self.feedbacks.all()
        res = []
        for feedback in feedbacks:
            temp = {}
            temp['id'] = feedback.id
            temp['assignee_id'] = feedback.assignee.id
            temp['assignee_username'] = feedback.assignee.username
            temp['message'] = feedback.message
            res.append(temp)
        return res


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

    def get_reviewing(self):
        """
        Returns dict of reviewed employee's full name and username
        """
        response = {}
        # better to have methods to do this
        response['full_name'] = self.review.employee.full_name
        response['username'] = self.review.employee.username
        return response

    def get_assignee(self):
        """
        Returns dict of assignee's id, full name and username'
        """
        response = {}
        # better to have methods to do this
        response['id'] = self.assignee.id
        response['username'] = self.assignee.username
        response['full_name'] = self.assignee.full_name
        return response
