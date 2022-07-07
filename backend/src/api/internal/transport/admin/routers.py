from rest_framework.routers import SimpleRouter

from api.internal.transport.admin.AdminViewSet import AdminViewSet
from api.internal.transport.admin.ProductAdministrationViewSet import ProductAdministrationViewSet
from api.internal.transport.admin.StorageCellAdministrationViewSet import StorageCellAdministrationViewSet

adminRouter = SimpleRouter()
adminRouter.register("admin", AdminViewSet, basename="admin")

product_admin_router = SimpleRouter()
product_admin_router.register("admin/products", ProductAdministrationViewSet, basename="admin.products")

storage_admin_router = SimpleRouter()
storage_admin_router.register("admin/storage", StorageCellAdministrationViewSet, basename="admin.storage")
