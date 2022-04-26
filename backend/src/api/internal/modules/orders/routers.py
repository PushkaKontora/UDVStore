from rest_framework.routers import SimpleRouter

from api.internal.modules.orders.transport import OrdersViewSet, OrderViewSet

orders_router = SimpleRouter()
orders_router.register("orders", OrdersViewSet, basename="orders")

order_router = SimpleRouter()
order_router.register("order", OrderViewSet, basename="order")
