# Generated by Django 3.1.5 on 2022-04-12 20:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0002_help_sender'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='help',
            name='email',
        ),
        migrations.RemoveField(
            model_name='help',
            name='name',
        ),
    ]