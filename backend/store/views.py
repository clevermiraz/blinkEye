from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.hashers import make_password

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.decorators import api_view, permission_classes

from .send_email import send_order_summary_email
from .pagination import DefaultPagination
from .filters import ProductFilter
from .models import Product, FeaturedProduct, Order, ShippingAddress, OrderItem, Customer, HomeAddress
from .serializers import (ProductSerializer,
                          FeaturedProductSerializer,
                          OrderSerializer, UserSerializer, UserSerializerWithToken)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user, many=False)
        for k, v in serializer.data.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# for register
class RegisterUserView(CreateAPIView):
    serializer_class = UserSerializerWithToken

    def create(self, request, *args, **kwargs):
        data = request.data

        try:
            CustomUser = get_user_model()
            user = CustomUser.objects.create(
                full_name=data['full_name'],
                phone_number=data['phone_number'],
                # email=data['email'],
                password=make_password(data['password'])
            )

            serializer = UserSerializerWithToken(user, many=False)

            return Response(serializer.data)

        except Exception:
            message = {'detail': 'User with this phone already exits'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class GetUserProfileView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    CustomUser = get_user_model()
    queryset = CustomUser.objects.all()

    def get_object(self):
        return self.request.user


class ProductList(ListAPIView):
    # queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['title', 'description']
    ordering_fields = ['unit_price']
    pagination_class = DefaultPagination
    search_param = 'keyword'

    def get_queryset(self):
        queryset = Product.objects.filter(countInStock__gt=0)
        return queryset


class ProductDetail(RetrieveAPIView):
    # RetrieveAPIView is used to retrieve a single object
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class FeaturedProductList(ListAPIView):
    queryset = FeaturedProduct.objects.all()
    serializer_class = FeaturedProductSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    customer = Customer.objects.get(user=user)

    if orderItems and len(orderItems) == 0:
        return Response({'detail: No Order Item'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1. Create Order
        order = Order.objects.create(
            customer=customer,
            total_price=data['totalPrice'],
        )
        # 2. Create Shipping Address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postal_code=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country']
        )
        print(shipping)
        # 3. Create Order Items and set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                quantity=i['quantity'],
                unit_price=i['unit_price'],
            )
            # 4. Update Stock
            product.countInStock -= item.quantity
            product.save()

        # if Successfully placed order then send Email Of That Order To Customer
        # the check If User Have Email Address
        customer_email = order.customer.user.email
        if customer_email:
            send_order_summary_email(order)

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
def getMyOrders(request):
    user = request.user

    # orders = user.order_set.all()
    orders = user.customer.order_set.all()
    serializer = OrderSerializer(orders, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def getOrderById(request, pk):
    user = request.user

    try:
        order = Order.objects.get(id=pk)
        if order.customer.user == user:
            serializer = OrderSerializer(order, many=False, context={'request': request})
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not Authorize to see the order view'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response({'detail': 'Order Does Not Exits'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    customer = Customer.objects.get(user=user)
    home_address = HomeAddress.objects.get(customer=customer)

    user.full_name = data['full_name']
    customer.phone_number = data['phone_number']
    user.email = data['email']
    customer.birth_date = data['birth_date']
    home_address.address = data['address']
    home_address.city = data['city']
    home_address.postal_code = data['postal_code']

    # if data['password'] != '':
    #     user.password = make_password(data['password'])

    user.save()
    customer.save()
    home_address.save()

    return Response(serializer.data)
