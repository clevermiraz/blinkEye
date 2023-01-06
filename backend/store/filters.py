from django_filters.rest_framework import FilterSet
from .models import Product


class ProductFilter(FilterSet):
    class Meta:
        model = Product
        fields = {
            'collection': ['exact'],
            'countInStock': ['exact', 'gte', 'lte'],
        }
