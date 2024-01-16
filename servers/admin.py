from django.contrib import admin
from servers.models import server,domaininfo
# Register your models here.
class ServerAdmin(admin.ModelAdmin):
 list_display = [ 'name','address','password','id']
class DomainchngAdmin(admin.ModelAdmin):
 list_display = [ 'name','uuid','servername','host']
 
admin.site.register(domaininfo,DomainchngAdmin)
admin.site.register(server,ServerAdmin)