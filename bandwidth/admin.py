from django.contrib import admin
from .models import Server

class ServerAdmin(admin.ModelAdmin):
    list_display = ('hostname', 'ip_address', 'api_key', 'api_password','panel_ipaddress')
    search_fields = ('hostname', 'ip_address')

admin.site.register(Server, ServerAdmin)
