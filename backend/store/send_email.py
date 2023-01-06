from django.core.mail import send_mail
from .models import ShippingAddress


def send_order_summary_email(order):
    print(order)
    shipping_address = ShippingAddress.objects.get(order=order)
    print(order.customer.user.email)
    # Build the email message
    subject = 'Order Summary'
    message = 'Thank you for your order!\n\n'
    message += 'Order details:\n'
    message += f'Order ID: {order.id}\n'
    message += f'Total price: {order.total_price}\n\n'
    message += 'Shipping address:\n'
    message += f'{order.customer}\n'
    message += f'{order.customer.user.phone_number}\n'
    message += f'{shipping_address}\n\n\n'
    # message += f'{order.shipping_address.city}, {order.shipping_address.country}\n'
    # message += f'{order.shipping_address.postal_code}\n\n'
    message += 'Order items:\n'
    for item in order.orderitem_set.all():
        print(item)
        message += f'{item.product.title} ({item.quantity} x {item.unit_price})\n'
    message += '\nThank you again for your order!'
    from_email = 'sender@example.com'
    to_email = [order.customer.user.email]

    # Send the email
    send_mail(subject, message, from_email, to_email)
