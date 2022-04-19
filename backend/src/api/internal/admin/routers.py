from rest_framework.routers import SimpleRouter

from api.internal.admin.transport.AdminViewSet import AdminViewSet

adminRouter = SimpleRouter()
adminRouter.register("admin", AdminViewSet)