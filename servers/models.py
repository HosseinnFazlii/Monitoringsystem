from django.db import models

# Create your models here.
class server(models.Model):
    name=models.CharField(max_length=100)
    address=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    
class domaininfo(models.Model):
    name=models.CharField(max_length=100)
    uuid=models.CharField(max_length=100)
    servername=models.CharField(max_length=100)
    host=models.CharField(max_length=100)
    port = models.CharField(max_length=100,default=0)
    zoneid = models.CharField(max_length=100,default=0)
    specificid=models.CharField(max_length=100,default=0)
    ipaddress=models.CharField(max_length=100,default=0)