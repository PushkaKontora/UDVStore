from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response

from api.internal.models.store import Transaction, TransactionTypes
from api.internal.serializers.admin import AccrualRequestSerializer, TransactionVerdictSerializer
from api.internal.serializers.transaction import TransactionSerializer
from api.internal.services.admin import get_requests_from_users, try_accrue
from api.internal.services.admin.service import try_connect_transactions
from api.internal.services.profile import get_profile_history
from api.internal.services.user import get_default_user_profile


class AdminViewSet(viewsets.ViewSet):
    queryset = Transaction.objects.all()
    permission_classes = (IsAdminUser,)

    @action(detail=True, methods=["get"], url_path="history", url_name="history")
    def history(self, request: Request, pk=None) -> Response:
        user = User.objects.filter(id=pk).first()
        profile = get_default_user_profile(user)

        if not profile:
            return Response(status=404)

        transactions = get_profile_history(profile)
        ser = TransactionSerializer(transactions, many=True, context={"request": request})
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

        return Response(data=TransactionSerializer(transactions, many=True, context={"request": request}).data)

    @action(detail=False, methods=["get"], url_path="deposits", url_name="deposits")
    def deposits(self, request: Request) -> Response:
        transactions = get_requests_from_users()

        return Response(data=TransactionSerializer(transactions, many=True, context={"request": request}).data)

    @action(detail=False, methods=["post"])
    def approve(self, request: Request):
        trans_id = request.data.get("transaction_id")
        data = {
            "transaction_id": trans_id,
            "amount": request.data.get("amount", 1),
            "comment": request.data.get("comment", ""),
            "status": TransactionTypes.APPROVED,
        }

        ser = TransactionVerdictSerializer(data=data)
        ser.is_valid(raise_exception=True)

        approved_trans = ser.save()
        is_successful = try_accrue([approved_trans])

        if not is_successful:
            return Response(status=500)

        old_transaction = Transaction.objects.filter(id=trans_id).first()
        is_successful = try_connect_transactions(old_transaction, approved_trans)

        if not is_successful:
            return Response(status=500)

        return Response(data="Successful", status=200)

    @action(detail=False, methods=["post"])
    def cancel(self, request: Request):
        trans_id = request.data.get("transaction_id")
        data = {
            "transaction_id": request.data.get("transaction_id"),
            "comment": request.data.get("comment", ""),
            "status": TransactionTypes.CANCELED,
        }

        ser = TransactionVerdictSerializer(data=data)
        ser.is_valid(raise_exception=True)

        cancelled_trans = ser.save()
        old_transaction = Transaction.objects.filter(id=trans_id).first()
        is_successful = try_connect_transactions(old_transaction, cancelled_trans)

        if not is_successful:
            return Response(status=500)

        return Response(data="Successful", status=200)
