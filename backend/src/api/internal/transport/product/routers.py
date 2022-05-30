from rest_framework.routers import SimpleRouter

from api.internal.transport.product.ProductViewSet import ProductViewSet

product_router = SimpleRouter()
product_router.register("products", ProductViewSet)
