# Generated by Django 4.1.4 on 2023-01-06 05:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_alter_homeaddress_customer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homeaddress',
            name='customer',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='store.customer'),
        ),
    ]
