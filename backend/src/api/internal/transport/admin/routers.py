from django.urls import path
from rest_framework.routers import SimpleRouter

from api.internal.transport.admin.AdminViewSet import AdminViewSet
from api.internal.transport.admin.ProductAdministrationView import ProductAdministrationView
from api.internal.transport.admin.StorageCellAdministrationView import StorageCellAdministrationView

adminRouter = SimpleRouter()
adminRouter.register("admin", AdminViewSet, basename="admin")

product_admin_path = path("admin/products/", ProductAdministrationView.as_view())
storage_admin_path = path("admin/storage/", StorageCellAdministrationView.as_view())
