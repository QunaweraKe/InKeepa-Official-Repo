# Generated by Django 3.1.5 on 2022-04-05 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_auto_20220405_1427'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Requested Cancellation'),
        ),
    ]
