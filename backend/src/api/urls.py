from django.urls import include, path

from api.internal.transport.admin.routers import admin_router, product_admin_router, storage_admin_router
from api.internal.transport.cart.routers import cart_router
from api.internal.transport.gift.routers import gift_router
from api.internal.transport.order.routers import order_router, orders_router
from api.internal.transport.product.routers import product_router
from api.internal.transport.profile.routers import profileRouter

urlpatterns = [
    path("", include(product_router.urls)),
    path("", include(gift_router.urls)),
    path("", include(cart_router.urls)),
    path("", include(profileRouter.urls)),
    path("", include(orders_router.urls)),
    path("", include(order_router.urls)),
    path("", include(admin_router.urls)),
    path("", include(product_admin_router.urls)),
    path("", include(storage_admin_router.urls)),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]
