# Generated by Django 3.1.5 on 2022-06-01 17:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20220528_0520'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='special',
            new_name='special_offer',
        ),
    ]