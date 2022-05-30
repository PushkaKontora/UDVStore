from rest_framework.routers import SimpleRouter

from api.internal.transport.profile.ProfileViewSet import ProfileViewSet

profileRouter = SimpleRouter()
profileRouter.register("profile", ProfileViewSet, basename="profile")
