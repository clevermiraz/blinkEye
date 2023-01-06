from django.contrib import admin
from django.db.models import Count
from django.utils.html import format_html
from django.utils.http import urlencode
from django.urls import reverse
from django.db.models.query import QuerySet

from . import models


@admin.register(models.Collection)
class CollectionAdmin(admin.ModelAdmin):
    # autocomplete_fields = ['featured_product']
    list_display = ['title', 'products_count']
    search_fields = ['title']

    @admin.display(ordering='products_count')
    def products_count(self, collection):
        url = (
            reverse('admin:store_product_changelist')
            + '?'
            + urlencode({
                'collection__id': str(collection.id)
            }))
        return format_html('<a href="{}">{} Products</a>', url, collection.products_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            products_count=Count('product')
        )


@admin.register(models.Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['title', 'products_count']
    search_fields = ['title']

    @admin.display(ordering='products_count')
    def products_count(self, brand):
        url = (
            reverse('admin:store_product_changelist')
            + '?'
            + urlencode({
                'brand__id': str(brand.id)
            }))
        return format_html('<a href="{}">{} Products</a>', url, brand.products_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            products_count=Count('product')
        )


class countInStockFilter(admin.SimpleListFilter):
    title = 'Count In Stock'
    parameter_name = 'count_in_stock'

    def lookups(self, request, model_admin):
        return [
            ('<10', 'Low')
        ]

    def queryset(self, request, queryset: QuerySet):
        if self.value() == '<10':
            return queryset.filter(countInStock__lt=10)


class ProductImageInline(admin.TabularInline):
    model = models.ProductImage
    readonly_fields = ['thumbnail']
    extra = 1

    def thumbnail(self, instance):
        if instance.image.name != '':
            return format_html(f'<img src="{instance.image.url}" class="thumbnail"/>')
        return ''


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    autocomplete_fields = ['collection', 'brand']
    list_display = ['title', 'unit_price', 'count_in_stock', 'collection']
    # list_editable = ['unit_price']
    inlines = [ProductImageInline]
    list_filter = ['collection', 'last_update', countInStockFilter]
    list_per_page = 10
    list_select_related = ['collection']
    search_fields = ['title']

    @admin.display(ordering='countInStock')
    def count_in_stock(self, product):
        if product.countInStock < 10:
            return 'Low'
        return 'OK'


class HomeAddressInline(admin.StackedInline):
    model = models.HomeAddress
    extra = 1
    max_num = 3


@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['full_name',  'membership', 'orders']
    inlines = [HomeAddressInline]
    list_editable = ['membership']
    list_per_page = 10
    list_select_related = ['user']
    ordering = ['user__full_name']
    search_fields = ['user__full_name__istartswith', 'phone_number__startswith']

    @admin.display(ordering='orders_count')
    def orders(self, customer):
        url = (
            reverse('admin:store_order_changelist')
            + '?'
            + urlencode({
                # 'customer__id': str(customer.id)
                'customer__user__id': str(customer.user_id)
            }))
        return format_html('<a href="{}">{} Orders</a>', url, customer.orders_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            orders_count=Count('order')
        )


class OrderItemInline(admin.TabularInline):
    autocomplete_fields = ['product']
    min_num = 1
    max_num = 10
    model = models.OrderItem
    extra = 0


class ShippingAddressInline(admin.StackedInline):
    model = models.ShippingAddress


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    autocomplete_fields = ['customer']
    inlines = [OrderItemInline, ShippingAddressInline]
    list_display = ['id', 'order_placed_at', 'customer']
    # list filter by payment status
    list_filter = ['order_placed_at', 'product_delivery_status']
    actions = ['mark_as_delivered']

    @admin.action(description='Mark as delivered')
    def mark_as_delivered(self, request, queryset):
        queryset.update(product_delivery_status='C')
        self.message_user(request, 'Successfully marked as delivered your Selected Item')


@admin.register(models.FeaturedProduct)
class FeaturedProductAdmin(admin.ModelAdmin):
    list_display = ['product']
    autocomplete_fields = ['product']


admin.site.register(models.OrderItem)
