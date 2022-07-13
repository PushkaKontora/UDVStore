from rest_framework.routers import SimpleRouter

from api.internal.transport.activity.handlers import ActivityViewSet

activities_router = SimpleRouter()
activities_router.register("activities", ActivityViewSet, basename="activities")
