from rest_framework.routers import SimpleRouter

from api.internal.modules.gift.transports import GiftViewSet

gift_router = SimpleRouter()
gift_router.register("gifts", GiftViewSet, basename="gift")
