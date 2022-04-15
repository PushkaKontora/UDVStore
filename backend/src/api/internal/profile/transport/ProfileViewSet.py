from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.internal.models.profile import Profile
from api.internal.models.store import Transaction
from api.internal.profile.serializers.ProfileSerializer import ProfileSerializer
from api.internal.profile.serializers.TransactionSerializer import TransactionSerializer
from api.internal.services.profile.history import get_profile_history


class ProfileViewSet(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ("get", "post", "patch", "delete")

    @action(detail=False, methods=['get'])
    def history(self, request):
        cur_user = request.user
        cur_profile = Profile.objects.filter(user=cur_user)[0]
        return get_profile_history(cur_profile)
