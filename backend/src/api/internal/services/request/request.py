from typing import Dict, List, Union

from django.db.models import QuerySet
from rest_framework.request import Request


def get_parameters_from_get_request(request: Request, names: List[str]) -> dict:
    return dict((name, request.query_params[name]) for name in names if name in request.query_params)


def validate_get_parameters_for_filtering(queryset: QuerySet, values: Dict[str, Union[int, str]]) -> bool:
    try:
        queryset.filter(**values)
        return True
    except ValueError:
        return False
