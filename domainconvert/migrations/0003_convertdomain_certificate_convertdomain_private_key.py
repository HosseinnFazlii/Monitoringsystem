# Generated by Django 4.2.9 on 2024-08-10 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('domainconvert', '0002_convertdomain_rootdomain'),
    ]

    operations = [
        migrations.AddField(
            model_name='convertdomain',
            name='certificate',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='convertdomain',
            name='private_key',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
