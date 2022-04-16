from rest_framework.routers import SimpleRouter

from api.internal.cart.transport import CartViewSet

cart_router = SimpleRouter()
cart_router.register("cart", CartViewSet, basename="cart")
