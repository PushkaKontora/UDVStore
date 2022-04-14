from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.models import Transaction
from api.internal.gift.serializers import GiftSerializer
from api.internal.services.request import get_parameters_from_get_request, validate_get_parameters_for_filtering


class GiftViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = GiftSerializer
    http_method_names = ("get", "post")
    permission_classes = (IsAuthenticated,)

    def list(self, request: Request, *args, **kwargs) -> Response:
        parameters = get_parameters_from_get_request(request, ["source", "destination"])

        if not validate_get_parameters_for_filtering(self.queryset, parameters):
            return Response(ParseError().get_full_details(), status=400)

        gifts = self.queryset.filter(**parameters)
        serialized = self.serializer_class(gifts, many=True)

        return Response(serialized.data)
