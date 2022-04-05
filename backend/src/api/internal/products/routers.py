from rest_framework.routers import SimpleRouter

from api.internal.products.transport import ProductsViewSet


productsRouter = SimpleRouter()
productsRouter.register("products", ProductsViewSet)
