from django.urls import path, include

from api.internal.profile import profileRouter
from api.internal.transport.rest.auth_views import *
from api.internal.transport.rest.profile_views import *
from api.internal.products import productsRouter
from api.internal.gifts import giftsRouter

urlpatterns = [
    path("login/", login),
    path('logout/', logout),
    path("", include(productsRouter.urls)),
    path("", include(giftsRouter.urls)),
    path("", include(profileRouter.urls)),

    path("test/", test_view)
]