from rest_framework.routers import SimpleRouter

from .cart import CartViewSet
from .gift import GiftViewSet

cart_router = SimpleRouter()
cart_router.register("cart", CartViewSet, basename="cart")

gift_router = SimpleRouter()
gift_router.register("gifts", GiftViewSet, basename="gift")
