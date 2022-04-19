from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from api.internal.profile.serializers import TransactionSerializer
from api.internal.models.profile import Profile
from api.internal.models.store import Transaction
from api.internal.services.profile import get_profile_history


class AdminViewSet(viewsets.GenericViewSet):
    queryset = Transaction.objects.all()
    permission_classes = (IsAdminUser,)

    @action(detail=True, methods=['get'])
    def history(self, request, pk=None):
        profile = Profile.objects.filter(id=pk)[0]
        transactions = get_profile_history(profile)
        ser = TransactionSerializer(transactions, many=True)
        return Response(ser.data)
