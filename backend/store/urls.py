from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductList.as_view(), name='product_list'),
    path('products/<int:pk>/', views.ProductDetail.as_view(), name='product_detail'),
    path('products/top/', views.FeaturedProductList.as_view(), name='featured_product_list'),

    path('orders/add/', views.addOrderItems, name='add-order'),
    path('orders/myorders/', views.getMyOrders, name='my-orders'),
    path('orders/<int:pk>/', views.getOrderById, name='user-order'),

    path('users/register/', views.RegisterUserView.as_view(), name='register'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.GetUserProfileView.as_view(), name='user_profile'),
    path('users/profile/update/',
         views.updateUserProfile,
         name='users-profile-update'),
]
