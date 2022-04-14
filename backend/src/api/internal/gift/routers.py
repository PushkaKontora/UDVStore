from rest_framework.routers import SimpleRouter

from api.internal.gift.transports import GiftViewSet

gift_router = SimpleRouter()
gift_router.register("gifts", GiftViewSet)
