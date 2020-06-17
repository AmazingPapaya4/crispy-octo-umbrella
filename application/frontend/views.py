from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required
def index(request):
    return render(request, 'index.html')

@login_required
def redirect_to_app(request, exception):
    return render(request, 'index.html')
