from rest_framework import filters, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from api.internal.models.profile import Profile
from api.internal.models.store import Transaction, TransactionFile, TransactionTypes
from api.internal.modules.profile.serializers.ProfileSerializer import ProfileSerializer
from api.internal.modules.profile.serializers.TransactionSerializer import TransactionSerializer
from api.internal.services.profile import get_profile_history
from api.internal.services.user import get_default_user_profile, get_profiles, get_profiles_without


class ProfileViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = get_profiles()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ("get", "post", "patch", "delete")

    filter_backends = [filters.SearchFilter]
    search_fields = ["^user__first_name", "^user__last_name", "^patronymic"]

    def list(self, request: Request) -> Response:
        profiles = get_profiles_without(request.user)

        serializer = ProfileSerializer(profiles, many=True)

        return Response(data=serializer.data)

    @action(detail=False, methods=["get"])
    def current(self, request):
        profile = Profile.objects.filter(user=request.user).first()

        if not profile:
            return Response(status=404)

        ser = ProfileSerializer(profile)
        return Response(ser.data)

    @action(detail=False, methods=["get"])
    def history(self, request):
        profile = get_default_user_profile(request.user)

        if not profile:
            return Response(status=404)

        transactions = get_profile_history(profile)
        ser = TransactionSerializer(transactions, many=True)
        return Response(ser.data)

    @action(detail=False, methods=["post"])
    def report_activity(self, request):
        ser = TransactionSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        td = ser.validated_data
        del td["files"]
        nt = Transaction(**td)
        nt.type = TransactionTypes.ACCEPT
        nt.source = get_default_user_profile(request.user)
        nt.save()

        for k, v in request.FILES.items():
            tf = TransactionFile(transaction=nt, filename=v)
            tf.save()

        return Response(status=200)
