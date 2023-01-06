from django.db import models
from django.core.validators import MinValueValidator
from django.conf import settings
from django.core.validators import RegexValidator
from django.contrib import admin
from store.validators import validate_file_size


# Product model
class Brand(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']


class Collection(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    collection = models.ForeignKey(Collection, on_delete=models.PROTECT)
    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(1)])
    countInStock = models.IntegerField(validators=[MinValueValidator(0)])
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/images', validators=[validate_file_size])

    def __str__(self) -> str:
        return self.product.title

    class Meta:
        ordering = ['product']
# Product Model End


class Customer(models.Model):
    MEMBERSHIP_BRONZE = 'B'
    MEMBERSHIP_SILVER = 'S'
    MEMBERSHIP_GOLD = 'G'

    MEMBERSHIP_CHOICES = [
        (MEMBERSHIP_BRONZE, 'Bronze'),
        (MEMBERSHIP_SILVER, 'Silver'),
        (MEMBERSHIP_GOLD, 'Gold'),
    ]
    # get valid phone number with regex bangladesh
    phone_regex = RegexValidator(
        # ^(?:\+?88)?01[13-9]\d{8}$ for bangladesh
        regex=r'(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$',
        message="Phone number must be entered in the format: '01xxxxxxxxx' up to 11 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=15, blank=True, null=True, unique=True)
    # for Birthday wish our Customer wer need birth date field
    birth_date = models.DateField(blank=True, null=True)
    membership = models.CharField(max_length=1, choices=MEMBERSHIP_CHOICES, default=MEMBERSHIP_BRONZE)
    # We want One User only have one Customer profile so we use OneToOneField and set primary_key=True
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return f'{self.user.full_name}'

    @admin.display(ordering='user__full_name')
    def full_name(self):
        return self.user.full_name

    class Meta:
        ordering = ['user__full_name']
        permissions = [
            ('view_history', 'Can view history')
        ]


class Order(models.Model):
    PAYMENT_STATUS_PENDING = 'P'
    PAYMENT_STATUS_COMPLETE = 'C'
    PAYMENT_STATUS_FAILED = 'F'
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, 'Pending'),
        (PAYMENT_STATUS_COMPLETE, 'Complete'),
        (PAYMENT_STATUS_FAILED, 'Failed')
    ]

    PRODUCT_DELIVERY_PENDING = 'P'
    PRODUCT_DELIVERY_COMPLETE = 'C'
    PRODUCT_DELIVERY_CANCELLED = 'X'
    PRODUCT_DELIVERY_CHOICES = [
        (PRODUCT_DELIVERY_PENDING, 'Pending'),
        (PRODUCT_DELIVERY_COMPLETE, 'Complete'),
        (PRODUCT_DELIVERY_CANCELLED, 'Cancelled')
    ]

    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    payment_method = models.CharField(max_length=255, blank=True, null=True, default='Cash on Delivery')
    payment_status = models.CharField(
        max_length=1,
        choices=PAYMENT_STATUS_CHOICES,
        default=PAYMENT_STATUS_PENDING)
    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(1)])
    product_delivery_status = models.CharField(
        max_length=1,
        choices=PRODUCT_DELIVERY_CHOICES,
        default=PRODUCT_DELIVERY_PENDING)
    order_placed_at = models.DateTimeField(auto_now_add=True)
    delivered_at = models.DateTimeField(auto_now_add=False, blank=True, null=True)

    # get str show just order number
    def __str__(self) -> str:
        return str(self.id)


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, related_name='orderitems')

    order = models.ForeignKey(Order, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField(blank=True, null=True, default=0)
    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(1)])


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, primary_key=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    postal_code = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    shipping_price = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(1)], null=True, blank=True)

    def __str__(self) -> str:
        return self.address

    class Meta:
        ordering = ['address']


class HomeAddress(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, primary_key=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    postal_code = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        if self.address:
            return self.address
        else:
            return ''

    class Meta:
        ordering = ['address']


class FeaturedProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.product.title

    class Meta:
        ordering = ['product']
