from django.contrib import admin
from django.urls import path, include, re_path
from users.views import SignUpView


urlpatterns = [
    re_path(r'^signup', SignUpView.as_view(), name='signup'),
    re_path(r'^admin', admin.site.urls),
    re_path(r'^accounts/', include('django.contrib.auth.urls')),
    re_path(r'^api/', include('users.urls')),
    re_path(r'^api/', include('reviews.urls')),
    re_path(r'^', include('frontend.urls')),
]

handler404 = 'frontend.views.redirect_to_app'
