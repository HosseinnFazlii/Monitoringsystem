from django.urls import path , include
from servers.views import cfip,servers_view,server_view,changedomain,changedomaininfo,mainchangedomain


app_name='servers'

urlpatterns2 = [
    path('',servers_view,name='servers'),

    path('<int:server_id>', server_view, name='server'),

    path('cfip/<int:server_id>',cfip,name='cfip'),

    path('changedomain',changedomain,name='changedomain'),

    #page for select what domain should be replace

    path('changedomain/<int:server_id>',changedomaininfo,name='changedomain'),

#url that handel domain changing and ssh to server
    path('changedomain/<int:server_id>/<int:domain_id>',mainchangedomain,name='mainchangedomain'),
    
]