from django.contrib import admin
from .models import ConvertDomain

@admin.register(ConvertDomain)
class ConvertDomainAdmin(admin.ModelAdmin):
    list_display = ('name', 'host', 'zoneid', 'rootdomain')
    search_fields = ('name', 'host', 'rootdomain')
    fields = ('name', 'host', 'zoneid', 'rootdomain', 'certificate', 'private_key')

