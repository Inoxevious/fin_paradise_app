# Generated by Django 3.0.8 on 2021-02-13 10:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20210213_1034'),
    ]

    operations = [
        migrations.RenameField(
            model_name='clients',
            old_name='insti',
            new_name='organization',
        ),
        migrations.RenameField(
            model_name='loanofficer',
            old_name='insti',
            new_name='organization',
        ),
        migrations.RenameField(
            model_name='manager',
            old_name='insti',
            new_name='organization',
        ),
    ]