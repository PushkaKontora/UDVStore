from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.internal.models import StorageCell
from api.internal.serializers.product import StorageCellSerializer
from api.internal.serializers.storage_cell import StorageInSerializer
from api.internal.services.admin import update_storage


class StorageCellAdministrationViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = StorageCell.objects.all()
    serializer_class = StorageCellSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def partial_update(self, request: Request, pk=None) -> Response:
        if type(request.data) is not dict:
            return Response(status=400)

        if not self.queryset.filter(id=pk).exists():
            return Response(status=404)

        data = {"amount": request.data.get("amount")}

        serializer = StorageInSerializer(data=data, partial=True)
        serializer.is_valid(raise_exception=True)

        update_storage(cell_id=pk, amount=serializer.data["amount"])

        return Response(status=200)
