from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from api.internal.permissions import IsDefaultUser
from api.internal.serializers.transaction import TransactionSerializer
from api.internal.user.db.repositories import TransactionRepository, UserRepository
from api.internal.user.domain.serializers import UserSerializer
from api.internal.user.domain.services import UserService, TransactionService


class ProfileViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsDefaultUser]
    http_method_names = ["GET", "POST"]

    filter_backends = [filters.SearchFilter]
    search_fields = ["^user__first_name", "^user__last_name", "^patronymic"]

    user_service = UserService(user_repo=UserRepository())
    transaction_service = TransactionService(transaction_repo=TransactionRepository())

    def list(self, request: Request) -> Response:
        profiles = self.user_service.get_default_profiles_without(request.user)

        return Response(data=UserSerializer(profiles, many=True, context={"request": request}).data)

    @action(methods=["GET"], detail=False, permission_classes=[IsAuthenticated])
    def current(self, request: Request) -> Response:
        profile = self.user_service.get_profile(request.user)

        return Response(data=UserSerializer(profile, context={"request": request}).data)

    @action(methods=["GET"], detail=False)
    def history(self, request: Request) -> Response:
        transactions = self.transaction_service.get_history(request.user)

        return Response(data=TransactionSerializer(transactions, many=True, context={"request": request}).data)

    @action(methods=["POST"], detail=False)
    def report_activity(self, request: Request) -> Response:
        data = {"description": request.data.get("activity")}

        serializer = TransactionSerializer(data=data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)

        was_reported = self.transaction_service.try_create_activity(request.user, data["description"], request.FILES)

        return Response(status=200 if was_reported else 422)
