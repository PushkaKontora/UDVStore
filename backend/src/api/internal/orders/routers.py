from rest_framework.routers import SimpleRouter

from api.internal.orders.transport import OrderViewSet

order_router = SimpleRouter()
order_router.register("orders", OrderViewSet, basename="orders")
