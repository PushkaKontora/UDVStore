from django.urls import path, include

from api.internal.products import productsRouter
from api.internal.gifts import giftsRouter

urlpatterns = [
    path("", include(productsRouter.urls)),
    path("", include(giftsRouter.urls)),
]
