from django.contrib.auth.models import User
from rest_framework.response import Response

from api.internal.models.profile import Profile
from api.internal.models.store import Transaction
from api.internal.profile.serializers.TransactionSerializer import TransactionSerializer


def get_profile_history(cur_profile: Profile):
    transactions = Transaction.objects.filter(source=cur_profile)
    ser = TransactionSerializer(transactions, many=True)
    return Response(ser.data)