from django.urls import include, path

from api.internal.modules.admin import adminRouter
from api.internal.modules.cart import cart_router
from api.internal.modules.gift import gift_router
from api.internal.modules.orders import order_router, orders_router
from api.internal.modules.product import product_router
from api.internal.modules.profile import profileRouter

urlpatterns = [
    path("", include(product_router.urls)),
    path("", include(gift_router.urls)),
    path("", include(cart_router.urls)),
    path("", include(profileRouter.urls)),
    path("", include(orders_router.urls)),
    path("", include(order_router.urls)),
    path("", include(adminRouter.urls)),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]
