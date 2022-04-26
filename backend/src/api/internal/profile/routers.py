from rest_framework.routers import SimpleRouter

from api.internal.profile.transport.ProfileViewSet import ProfileViewSet

profileRouter = SimpleRouter()
profileRouter.register("profile", ProfileViewSet, basename="profile")
