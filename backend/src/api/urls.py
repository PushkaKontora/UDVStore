from django.urls import path, include

from api.internal.admin import adminRouter
from api.internal.cart import cart_router
from api.internal.profile import profileRouter
from api.internal.product import product_router
from api.internal.gift import gift_router

urlpatterns = [
    path("", include(product_router.urls)),
    path("", include(gift_router.urls)),
    path("", include(cart_router.urls)),
    path("", include(profileRouter.urls)),
    path("", include(adminRouter.urls)),
]
