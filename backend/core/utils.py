import random


def send_otp_to_phone(phone_number):
    try:
        otp = random.randint(1000, 9999)
        # url = ''
        # response = requests.get(url)
        return otp

    except Exception as e:
        print(e)
