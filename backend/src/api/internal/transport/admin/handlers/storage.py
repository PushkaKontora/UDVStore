from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from api.internal.models import StorageCell
from api.internal.serializers.product import StorageCellSerializer


class StorageCellAdministrationViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = StorageCell.objects.all()
    serializer_class = StorageCellSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
