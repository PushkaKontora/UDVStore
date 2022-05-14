from rest_framework import filters, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from api.internal.models.profile import Profile
from api.internal.modules.profile.serializers.ProfileSerializer import ProfileSerializer
from api.internal.serializers import TransactionSerializer
from api.internal.services.profile import create_activity, get_profile_history
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
    def current(self, request: Request) -> Response:
        profile = Profile.objects.filter(user=request.user).first()

        if not profile:
            return Response(status=404)

        ser = ProfileSerializer(profile)
        return Response(ser.data)

    @action(detail=False, methods=["get"])
    def history(self, request: Request) -> Response:
        profile = get_default_user_profile(request.user)

        if not profile:
            return Response(status=404)

        transactions = get_profile_history(profile)
        ser = TransactionSerializer(transactions, many=True)
        return Response(ser.data)

    @action(detail=False, methods=["post"])
    def report_activity(self, request: Request) -> Response:
        profile = get_default_user_profile(request.user)
        if not profile:
            return Response(status=403)

        data = {"description": request.data.get("activity")}

        serializer = TransactionSerializer(data=data, partial=True)
        serializer.is_valid(raise_exception=True)

        transaction = create_activity(profile, data["description"], request.FILES)
        if not transaction:
            return Response(status=500)

        return Response(status=200)
