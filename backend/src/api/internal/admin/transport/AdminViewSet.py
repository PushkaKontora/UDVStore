from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from api.internal.profile.serializers import TransactionSerializer
from api.internal.models.profile import Profile
from api.internal.models.store import Transaction, TransactionTypes
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

    @action(detail=False, methods=['POST'])
    def accural(self, request):
        body = request.data
        if body['price'] <= 0:
            return Response("Цена должна быть положительной", status=400)
        if not 'comment' in body:
            body['comment'] = None
        for p in body['to_profile_ids']:
            profile = Profile.objects.filter(id=p)
            if len(profile) == 0:
                return Response("Профиля с таким id нет: " + p, status=404)
            nt = Transaction(type=TransactionTypes.DEPOSIT,
                             source=None,
                             destination=profile[0],
                             accrual=body['price'],
                             order=None,
                             description=body['comment'])
            nt.save()
            profile[0].balance += body['price']
            profile[0].save()
        return Response(status=200)

