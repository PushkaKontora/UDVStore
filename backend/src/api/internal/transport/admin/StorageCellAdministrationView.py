from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.internal.serializers.product import StorageIDsSerializer
from api.internal.services.admin.service import delete_cells


class StorageCellAdministrationView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request: Request) -> Response:
        data = {"ids": request.data}

        serializer = StorageIDsSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        delete_cells(data["ids"])

        return Response(status=200)
