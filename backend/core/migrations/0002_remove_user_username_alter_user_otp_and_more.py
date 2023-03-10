# Generated by Django 4.1.4 on 2022-12-29 14:13

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
        migrations.AlterField(
            model_name='user',
            name='otp',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=11, null=True, unique=True, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '01xxxxxxxxx' up to 11 digits allowed.", regex='(^(\\+8801|8801|01|008801))[1|3-9]{1}(\\d){8}$')]),
        ),
    ]
