# Generated by Django 3.0.8 on 2021-02-14 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0002_loanapplication'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loanapplication',
            name='income',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
