# Generated by Django 4.2.9 on 2024-05-28 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servers', '0003_domaininfo_port'),
    ]

    operations = [
        migrations.AlterField(
            model_name='domaininfo',
            name='port',
            field=models.IntegerField(default=0),
        ),
    ]