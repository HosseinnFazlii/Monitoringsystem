from django.db import models

class ConvertDomain(models.Model):
    name = models.CharField(max_length=100)
    host = models.CharField(max_length=100)
    zoneid = models.CharField(max_length=100)
    rootdomain = models.CharField(max_length=100)
    certificate = models.TextField()  # To store the certificate
    private_key = models.TextField()  # To store the private key

    def __str__(self):
        return self.name
