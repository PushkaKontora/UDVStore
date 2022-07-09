from rest_framework.routers import SimpleRouter

from api.internal.transport.product.handlers import ProductViewSet

product_router = SimpleRouter()
product_router.register("products", ProductViewSet)
