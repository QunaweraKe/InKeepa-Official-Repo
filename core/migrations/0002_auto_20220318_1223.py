# Generated by Django 3.1.5 on 2022-03-18 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'Categories'},
        ),
        migrations.AddField(
            model_name='plant',
            name='available',
            field=models.BooleanField(default=True),
        ),
    ]