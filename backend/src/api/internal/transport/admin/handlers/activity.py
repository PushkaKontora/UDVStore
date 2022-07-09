from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.internal.models import Activity
from api.internal.serializers.activity import ActivitySerializer


class ActivityAdministrationViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
