from rest_framework.routers import SimpleRouter

from api.internal.transport.gift.GiftViewSet import GiftViewSet

gift_router = SimpleRouter()
gift_router.register("gifts", GiftViewSet, basename="gift")
