from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

# DEPRECATED


@api_view(["GET"])
def test_view(request):
    if request.user.is_authenticated:
        return Response("OK, you are authed", status=200)
    return Response("fuck you", status=400)


@api_view(["POST"])
def login(request):
    pass


@api_view(["POST"])
def logout(request):
    pass
