from django.urls import path
from . import views

urlpatterns = [
    path('send/', views.send_otp, name='send-otp'),
    path('verify/', views.verify_otp, name='verify-otp')
]
