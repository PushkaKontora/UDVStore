from rest_framework.routers import SimpleRouter

from api.internal.gifts.transports import GiftsViewSet

giftsRouter = SimpleRouter()
giftsRouter.register("gifts", GiftsViewSet)
