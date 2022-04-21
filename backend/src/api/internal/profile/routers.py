from rest_framework.routers import SimpleRouter

from api.internal.profile.transport.ProfileViewSet import ProfileViewSet
from api.internal.profile.transport.TransactionViewSet import TransactionViewSet

profileRouter = SimpleRouter()
profileRouter.register("profile", ProfileViewSet)

transactionRouter = SimpleRouter()
transactionRouter.register("transaction", TransactionViewSet)