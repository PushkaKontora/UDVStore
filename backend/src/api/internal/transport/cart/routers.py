from rest_framework.routers import SimpleRouter

from api.internal.transport.cart.handlers import CartViewSet

cart_router = SimpleRouter()
cart_router.register("cart", CartViewSet, basename="cart")
