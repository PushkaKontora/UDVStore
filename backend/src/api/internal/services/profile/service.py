from itertools import chain
from typing import List, Optional

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import IntegrityError, transaction
from django.db.models import Q
from django.utils.datastructures import MultiValueDict

from api.internal.models.profile import Profile
from api.internal.models.store import Transaction, TransactionFile, TransactionTypes


def get_profile_history(profile: Profile):
    return Transaction.objects.filter(
        (Q(source=profile) | Q(destination=profile)) & ~Q(type=TransactionTypes.REQUEST)
    ).order_by("-created_at")


def create_activity(
    profile: Profile, description: str, files: MultiValueDict[str, List[InMemoryUploadedFile]]
) -> Optional[Transaction]:
    try:
        with transaction.atomic():
            activity = Transaction.objects.create(
                type=TransactionTypes.REQUEST, source=profile, description=description
            )

            files = [TransactionFile(transaction=activity, filename=file) for file in chain(files.values())]
            TransactionFile.objects.bulk_create(files)

        return activity
    except IntegrityError:
        return None
