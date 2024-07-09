# Generated by Django 4.2.9 on 2024-07-09 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bandwidth', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bandwidthoutusage',
            name='bandwidth_usage',
        ),
        migrations.RemoveField(
            model_name='bandwidthoutusage',
            name='server',
        ),
        migrations.RemoveField(
            model_name='bandwidthusage',
            name='server',
        ),
        migrations.RemoveField(
            model_name='dailyusage',
            name='bandwidth_usage',
        ),
        migrations.RemoveField(
            model_name='dailyusage',
            name='server',
        ),
        migrations.AddField(
            model_name='server',
            name='chat_ID1',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='server',
            name='chat_ID2',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='server',
            name='free_bandwidth_gb',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='server',
            name='limit_bandwidth_gb',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='server',
            name='panel_port',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='server',
            name='telegramAPItoken',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='server',
            name='used_bandwidth_gb',
            field=models.CharField(default=0, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='server',
            name='vps_id',
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name='BandwidthInUsage',
        ),
        migrations.DeleteModel(
            name='BandwidthOutUsage',
        ),
        migrations.DeleteModel(
            name='BandwidthUsage',
        ),
        migrations.DeleteModel(
            name='DailyUsage',
        ),
    ]