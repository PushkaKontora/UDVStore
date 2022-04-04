from rest_framework.response import Response
from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def login(request):
    pass

@api_view(['POST'])
def logout(request):
    pass

