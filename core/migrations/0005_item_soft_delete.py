# Generated by Django 3.1.5 on 2022-03-19 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20220319_0232'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='soft_delete',
            field=models.BooleanField(default=False),
        ),
    ]
