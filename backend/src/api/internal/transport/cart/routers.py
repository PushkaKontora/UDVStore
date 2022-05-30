from rest_framework.routers import SimpleRouter

from api.internal.transport.cart.CartViewSet import CartViewSet

cart_router = SimpleRouter()
cart_router.register("cart", CartViewSet, basename="cart")
