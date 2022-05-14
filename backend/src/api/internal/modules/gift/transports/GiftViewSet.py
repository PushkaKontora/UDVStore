from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from api.internal.modules.gift.serializers import GiftSerializer
from api.internal.serializers import TransactionSerializer
from api.internal.services.gift import try_transfer
from api.internal.services.user import get_default_user_profile, get_profile


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

        destination = get_profile(serializer.data["destination"])
        description = serializer.data["description"]
        accrual = serializer.data["accrual"]

        transaction = try_transfer(source, destination, description, accrual)

        return Response(data=TransactionSerializer(transaction, context={"request": request}).data) if transaction else Response(status=400)
