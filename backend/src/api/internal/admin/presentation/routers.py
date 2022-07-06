from rest_framework.routers import SimpleRouter

from api.internal.admin.presentation.orders import OrdersViewSet

orders_router = SimpleRouter()
orders_router.register("orders", OrdersViewSet, basename="orders")
