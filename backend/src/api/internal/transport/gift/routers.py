from rest_framework.routers import SimpleRouter

from api.internal.transport.gift.handlers import GiftViewSet

gift_router = SimpleRouter()
gift_router.register("gifts", GiftViewSet, basename="gift")
