from api.internal.models.profile import Profile
from api.internal.models.store import Transaction


def get_profile_history(cur_profile: Profile):
    transactions = Transaction.objects.filter(source=cur_profile)
    return transactions
