from django.contrib import admin
from domaincheck.models import domain

# Register your models here.
class DomainAdmin(admin.ModelAdmin):
 list_display = [ 'domain_name']
 
admin.site.register(domain,DomainAdmin)