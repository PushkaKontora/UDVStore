from django.db.models import QuerySet

from api.internal.models import Product


def get_existed_products() -> QuerySet[Product]:
    return Product.objects.filter(is_deleted=False)


def exists_product(product_id: int) -> bool:
    return Product.objects.filter(id=product_id).exists()
