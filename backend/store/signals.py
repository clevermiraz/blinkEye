from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Customer
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


@receiver(post_save, sender=CustomUser)
def create_customer_for_new_user(sender, instance, created, **kwargs):
    if created:
        Customer.objects.create(
            user=instance,
            phone_number=instance.phone_number
        )
