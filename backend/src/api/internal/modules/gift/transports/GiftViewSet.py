from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from api.internal.modules.gift.serializers import GiftSerializer
from api.internal.serializers import TransactionSerializer
from api.internal.services.gift import try_transfer, try_gift
from api.internal.services.user import get_default_user_profile, get_profile, get_destinations


class GiftViewSet(ViewSet):
    permission_classes = (IsAuthenticated,)

    def create(self, request: Request) -> Response:
        source = get_default_user_profile(request.user)
        data = {
            "source": source.id,
            "destination": request.data.get("destination"),
            "description": request.data.get("description"),
            "accrual": request.data.get("accrual"),
        }

        serializer = GiftSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        destinations = get_destinations(source.id, data["destination"])
        description = data["description"]
        accrual = int(data["accrual"])

        transactions = try_gift(source, destinations, description, accrual)

        return (
            Response(data=TransactionSerializer(transactions, many=True, context={"request": request}).data)
            if len(transactions) == len(data["destination"])
            else Response(status=400)
        )
