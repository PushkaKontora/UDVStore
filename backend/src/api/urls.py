from django.urls import path, include

from api.internal.products import productsRouter


urlpatterns = [
    path("", include(productsRouter.urls))
]
