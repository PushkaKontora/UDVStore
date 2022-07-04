from rest_framework.permissions import BasePermission
from rest_framework.request import Request


class IsDefaultUser(BasePermission):
    def has_permission(self, request: Request, view) -> bool:
        return bool(request.user and not request.user.is_staff)
