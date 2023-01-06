from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Product, FeaturedProduct, Order, ProductImage, OrderItem, ShippingAddress, Customer, HomeAddress


class HomeAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeAddress
        fields = "__all__"


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    homeAddress = serializers.SerializerMethodField()

    def get_homeAddress(self, obj):
        try:
            homeAddress = HomeAddress.objects.get(customer=obj.customer)
            serializer = HomeAddressSerializer(homeAddress, many=False)
            return serializer.data
        except Exception:
            return None

    class Meta:
        CustomUser = get_user_model()
        model = CustomUser
        fields = '__all__'


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    customer = CustomerSerializer(many=False)

    homeAddress = serializers.SerializerMethodField()

    def get_homeAddress(self, obj):
        try:
            homeAddress = HomeAddress.objects.get(customer=obj.customer)
            serializer = HomeAddressSerializer(homeAddress, many=False)
            return serializer.data
        except Exception:
            return None

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    class Meta:
        CustomUser = get_user_model()
        model = CustomUser
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ['image']


class ProductSerializer(serializers.ModelSerializer):
    collection = serializers.StringRelatedField()
    brand = serializers.StringRelatedField()
    # get only first image on image field
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        image = obj.images.first()
        if image:
            return self.context['request'].build_absolute_uri(image.image.url)
        return None

    class Meta:
        model = Product
        fields = ['id', 'title', 'image', 'description', 'brand', 'collection', 'unit_price', 'countInStock', ]


class FeaturedProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = FeaturedProduct
        fields = ['id', 'product']


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=False)

    class Meta:
        model = OrderItem
        fields = '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True, context=self.context)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except ShippingAddress.DoesNotExist:
            address = False
        return address

    class Meta:
        model = Order
        fields = '__all__'
