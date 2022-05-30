from rest_framework.routers import SimpleRouter

from api.internal.transport.admin.AdminViewSet import AdminViewSet

adminRouter = SimpleRouter()
adminRouter.register("admin", AdminViewSet)
