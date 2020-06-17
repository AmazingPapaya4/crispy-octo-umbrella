from django.urls import path
from reviews import views

urlpatterns = [
    path(
        'v1/reviews/',
        views.ReviewList.as_view(),
        name='reviews'
    ),
    path('v1/reviews/<int:pk>/', views.ReviewDetail.as_view()),
    path('v1/feedbacks/', views.FeedbackList.as_view()),
    path('v1/feedbacks/<int:pk>/', views.FeedbackDetail.as_view()),
]
