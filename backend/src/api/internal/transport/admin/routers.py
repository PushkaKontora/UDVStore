from rest_framework.routers import SimpleRouter

from api.internal.transport.admin.handlers import (
    AdminViewSet,
    ProductAdministrationViewSet,
    StorageCellAdministrationViewSet,
)

admin_router = SimpleRouter()
admin_router.register("admin", AdminViewSet, basename="admin")

product_admin_router = SimpleRouter()
product_admin_router.register("admin/products", ProductAdministrationViewSet, basename="admin.products")

storage_admin_router = SimpleRouter()
storage_admin_router.register("admin/storage", StorageCellAdministrationViewSet, basename="admin.storage")
