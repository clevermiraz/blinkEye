from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from .manager import UserManager


class User(AbstractUser):
    username = None
    first_name = None
    last_name = None

    # use only full name instade of first and last name
    full_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True, unique=True)

    phone_regex = RegexValidator(
        # ^(?:\+?88)?01[13-9]\d{8}$ for bangladesh
        regex=r'(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$',
        message="Phone number must be entered in the format: '01xxxxxxxxx' up to 11 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=11,
                                    blank=True, null=True, unique=True)
    is_phone_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, null=True, blank=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    object = UserManager()


# makes a model which get a phone number and a password send otp
# and verify otp
# and then create a user
# and then login the user

# from django.contrib.auth import get_user_model
# from django.contrib.auth import login
# from django.contrib.auth import authenticate
# from django.contrib.auth import logout
# from django.contrib.auth import update_session_auth_hash
