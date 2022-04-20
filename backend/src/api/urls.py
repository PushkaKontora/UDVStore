from django.urls import path, include

from api.internal.cart import cart_router
from api.internal.orders import orders_router, order_router
from api.internal.profile import profileRouter
from api.internal.transport.rest.auth_views import *
from api.internal.transport.rest.profile_views import *
from api.internal.product import product_router
from api.internal.gift import gift_router

urlpatterns = [
    path("login/", login),
    path('logout/', logout),

    path("", include(product_router.urls)),
    path("", include(gift_router.urls)),
    path("", include(cart_router.urls)),
    path("", include(profileRouter.urls)),
    path("", include(orders_router.urls)),
    path("", include(order_router.urls)),

    path("test/", test_view)
]
