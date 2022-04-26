from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response

from api.internal.admin.serializers import AccrualRequestSerializer
from api.internal.profile.serializers import TransactionSerializer
from api.internal.models.store import Transaction
from api.internal.services.admin import try_accrue
from api.internal.services.profile import get_profile_history
from api.internal.services.user import get_profile


class AdminViewSet(viewsets.ViewSet):
    queryset = Transaction.objects.all()
    permission_classes = (IsAdminUser,)

    @action(detail=True, methods=['get'], url_path="history", url_name="history")
    def history(self, request: Request, pk=None) -> Response:
        profile = get_profile(pk)

        if not profile:
            return Response(status=404)

        transactions = get_profile_history(profile)
        ser = TransactionSerializer(transactions, many=True)
        return Response(ser.data)

    @action(detail=False, methods=['post'], url_path="accrual", url_name="accrual")
    def accrual(self, request: Request) -> Response:
        data = {
            "profile_ids": request.data.get("profile_ids"),
            "price": request.data.get("price"),
            "comment": request.data.get("comment")
        }

        serializer = AccrualRequestSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        transactions = serializer.save()
        is_success = try_accrue(transactions)

        if not is_success:
            return Response(status=500)

        return Response(data=TransactionSerializer(transactions, many=True).data)
