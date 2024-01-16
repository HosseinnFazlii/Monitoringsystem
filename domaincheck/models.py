from django.db import models

# Create your models here.
class domain(models.Model):
    domain_name=models.CharField(max_length=100)
    