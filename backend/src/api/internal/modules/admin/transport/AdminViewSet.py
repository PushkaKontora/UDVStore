from django.db import IntegrityError
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response

from api.internal.models.store import Transaction, TransactionTypes
from api.internal.modules.admin.serializers import AccrualRequestSerializer
from api.internal.modules.admin.serializers.TransactionVerdictSerializer import TransactionVerdictSerializer
from api.internal.modules.profile.serializers import TransactionSerializer
from api.internal.services.admin import try_accrue, get_requests_from_users
from api.internal.services.profile import get_profile_history
from api.internal.services.user import get_profile


class AdminViewSet(viewsets.ViewSet):
    queryset = Transaction.objects.all()
    permission_classes = (IsAdminUser,)

    @action(detail=True, methods=["get"], url_path="history", url_name="history")
    def history(self, request: Request, pk=None) -> Response:
        profile = get_profile(pk)

        if not profile:
            return Response(status=404)

        transactions = get_profile_history(profile)
        ser = TransactionSerializer(transactions, many=True)
        return Response(ser.data)

    @action(detail=False, methods=["post"], url_path="accrual", url_name="accrual")
    def accrual(self, request: Request) -> Response:
        data = {
            "profile_ids": request.data.get("profile_ids"),
            "price": request.data.get("price"),
            "comment": request.data.get("comment"),
        }

        serializer = AccrualRequestSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        transactions = serializer.save()
        is_success = try_accrue(transactions)

        if not is_success:
            return Response(status=500)

        return Response(data=TransactionSerializer(transactions, many=True).data)

    @action(detail=False, methods=["get"], url_path="deposits", url_name="deposits")
    def deposits(self, request: Request) -> Response:
        transactions = get_requests_from_users()

        return Response(data=TransactionSerializer(transactions, many=True).data)

    @action(detail=False, methods=["post"])
    def approve(self, request: Request):
        data = {
            "transaction_id": request.data.get("transaction_id"),
            "amount": request.data.get("amount", 1),
            "comment": request.data.get("comment", ""),
            "status": TransactionTypes.APPROVED
        }

        ser = TransactionVerdictSerializer(data=data)
        ser.is_valid(raise_exception=True)

        approved_trans = ser.save()
        is_success = try_accrue([approved_trans])

        if not is_success:
            return Response(status=500)

        return Response(data="Successful", status=200)


    @action(detail=False, methods=["post"])
    def cancel(self, request: Request):
        data = {
            "transaction_id": request.data.get("transaction_id"),
            "comment": request.data.get("comment", ""),
            "status": TransactionTypes.CANCELED
        }

        ser = TransactionVerdictSerializer(data=data)
        ser.is_valid(raise_exception=True)

        cancelled_trans = ser.save()
        try:
            cancelled_trans.save()
        except IntegrityError:
            return Response(status=500)

        return Response(data="Successful", status=200)
