from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .utils import send_otp_to_phone
from .models import User


@api_view(['POST'])
def send_otp(request):
    data = request.data

    if 'phone_number' not in data:
        return Response({'message': 'phone_number is required'}, status=status.HTTP_400_BAD_REQUEST)

    if 'password' not in data:
        return Response({'message': 'password is required'}, status=status.HTTP_400_BAD_REQUEST)

    phone_number = data['phone_number']

    user = User.object.create(phone_number=phone_number,
                              otp=send_otp_to_phone(phone_number)
                              )
    user.set_password = data.get('set_password')
    user.save()

    return Response('otp Sent', status=status.HTTP_200_OK)


@api_view(['POST'])
def verify_otp(request):
    data = request.data

    if 'phone_number' not in data:
        return Response({'message': 'phone_number is required'}, status=status.HTTP_400_BAD_REQUEST)

    if 'otp' not in data:
        return Response({'message': 'otp is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        phone_number = data['phone_number']
        user_obj = User.object.get(phone_number=phone_number)

    except Exception:
        return Response('User Not Found', status=status.HTTP_400_BAD_REQUEST)

    if user_obj.otp == data.get('otp'):
        user_obj.is_phone_verified = True
        user_obj.save()
        return Response('Succfully verify', status=status.HTTP_200_OK)

    if user_obj.otp != data.get('otp'):
        return Response('Invalic Otp', status=status.HTTP_200_OK)
