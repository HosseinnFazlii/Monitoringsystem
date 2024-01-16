from django.urls import path , include
from servers.views import cfip,servers_view,server_view


app_name='servers'

urlpatterns2 = [
    path('',servers_view,name='servers'),
     path('<int:server_id>', server_view, name='server'),
    path('cfip/<int:server_id>',cfip,name='cfip'),
    
]