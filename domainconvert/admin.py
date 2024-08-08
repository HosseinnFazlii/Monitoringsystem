from django.contrib import admin
from .models import ConvertDomain

@admin.register(ConvertDomain)
class ConvertDomainAdmin(admin.ModelAdmin):
    list_display = ('name', 'host', 'rootdomain','zoneid')
    search_fields = ('name', 'host')
