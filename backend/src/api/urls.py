from django.urls import path

from api.internal.transport.rest.auth_views import *
from api.internal.transport.rest.profile_views import *

urlpatterns = [
    path("login/", login),
    path('logout/', logout),


]