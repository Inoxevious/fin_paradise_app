# Generated by Django 3.0.8 on 2021-02-13 10:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20210213_1029'),
    ]

    operations = [
        migrations.RenameField(
            model_name='clients',
            old_name='info',
            new_name='profile',
        ),
        migrations.RenameField(
            model_name='loanofficer',
            old_name='info',
            new_name='profile',
        ),
        migrations.RenameField(
            model_name='manager',
            old_name='info',
            new_name='profile',
        ),
    ]