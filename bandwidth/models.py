from django.db import models

class Server(models.Model):
    hostname = models.CharField(max_length=255, unique=True, help_text="Hostname of the server")
    ip_address = models.GenericIPAddressField(protocol='both', unpack_ipv4=False, help_text="IP address of the server")
    api_key=models.CharField(max_length=255)
    api_password=models.CharField(max_length=255)
    panel_ipaddress=models.CharField(max_length=255)

    def __str__(self):
        return self.hostname

class BandwidthUsage(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='bandwidth_usages')
    limit = models.FloatField(help_text="Total bandwidth limit in MB")
    used = models.FloatField(help_text="Total bandwidth used in MB")
    free = models.FloatField(help_text="Total bandwidth free in MB")
    limit_gb = models.FloatField(help_text="Total bandwidth limit in GB")
    used_gb = models.FloatField(help_text="Total bandwidth used in GB")
    free_gb = models.FloatField(help_text="Total bandwidth free in GB")
    percent = models.FloatField(help_text="Percentage of bandwidth used")
    percent_free = models.FloatField(help_text="Percentage of bandwidth free")

    def __str__(self):
        return f"Bandwidth Usage for {self.server.hostname}: {self.used_gb}GB / {self.limit_gb}GB"

class DailyUsage(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='daily_usages')
    date = models.DateField(help_text="Date of usage")
    in_usage = models.FloatField(help_text="Inbound usage in MB")
    out_usage = models.FloatField(help_text="Outbound usage in MB")
    bandwidth_usage = models.ForeignKey(BandwidthUsage, on_delete=models.CASCADE, related_name='daily_usages')

    def __str__(self):
        return f"Daily Usage for {self.server.hostname} on {self.date}: IN {self.in_usage}MB, OUT {self.out_usage}MB"

class BandwidthInUsage(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='in_bandwidth_usages')
    usage = models.JSONField(help_text="JSON field storing daily in-bandwidth usage")
    used = models.FloatField(help_text="Total in-bandwidth used in MB")
    limit = models.FloatField(help_text="Total in-bandwidth limit in MB")
    free = models.FloatField(help_text="Total in-bandwidth free in MB")
    limit_gb = models.FloatField(help_text="Total in-bandwidth limit in GB")
    used_gb = models.FloatField(help_text="Total in-bandwidth used in GB")
    free_gb = models.FloatField(help_text="Total in-bandwidth free in GB")
    percent = models.FloatField(help_text="Percentage of in-bandwidth used")
    percent_free = models.FloatField(help_text="Percentage of in-bandwidth free")
    bandwidth_usage = models.OneToOneField(BandwidthUsage, on_delete=models.CASCADE, related_name='in_bandwidth')

    def __str__(self):
        return f"In Bandwidth for {self.server.hostname}: {self.used_gb}GB / {self.limit_gb}GB"

class BandwidthOutUsage(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='out_bandwidth_usages')
    usage = models.JSONField(help_text="JSON field storing daily out-bandwidth usage")
    used = models.FloatField(help_text="Total out-bandwidth used in MB")
    limit = models.FloatField(help_text="Total out-bandwidth limit in MB")
    free = models.FloatField(help_text="Total out-bandwidth free in MB")
    limit_gb = models.FloatField(help_text="Total out-bandwidth limit in GB")
    used_gb = models.FloatField(help_text="Total out-bandwidth used in GB")
    free_gb = models.FloatField(help_text="Total out-bandwidth free in GB")
    percent = models.FloatField(help_text="Percentage of out-bandwidth used")
    percent_free = models.FloatField(help_text="Percentage of out-bandwidth free")
    bandwidth_usage = models.OneToOneField(BandwidthUsage, on_delete=models.CASCADE, related_name='out_bandwidth')

    def __str__(self):
        return f"Out Bandwidth for {self.server.hostname}: {self.used_gb}GB / {self.limit_gb}GB"
