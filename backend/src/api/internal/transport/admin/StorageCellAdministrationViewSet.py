from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.internal.models.store import StorageCell
from api.internal.serializers.product import StorageCellSerializer


class StorageCellAdministrationViewSet(ModelViewSet):
    queryset = StorageCell.objects.all()
    serializer_class = StorageCellSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


