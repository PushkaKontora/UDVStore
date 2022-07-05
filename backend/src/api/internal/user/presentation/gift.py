from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from api.internal.permissions import IsDefaultUser
from api.internal.serializers.transaction import TransactionSerializer
from api.internal.services.gift import try_gift
from api.internal.services.user import get_default_user_profile, get_destinations
from api.internal.user.db.repositories import TransactionRepository, UserRepository
from api.internal.user.domain.serializers import GiftSerializer
from api.internal.user.domain.services import GiftService


class GiftViewSet(ViewSet):
    permission_classes = [IsAuthenticated, IsDefaultUser]

    gift_service = GiftService(user_repo=UserRepository(), transaction_repo=TransactionRepository())

    def create(self, request: Request) -> Response:
        data = {
            "source": request.user.id,
            "destinations": request.data.get("destinations"),
            "description": request.data.get("description"),
            "accrual": request.data.get("accrual"),
        }

        serializer = GiftSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        destinations = list(data["destinations"])
        unique_destinations = set(destinations)
        if len(unique_destinations) != len(destinations):
            return Response(status=400)

        was_created = self.gift_service.try_create(
            request.user.id, unique_destinations, int(data["accrual"]), data["description"]
        )

        return Response(status=200 if was_created else 422)
