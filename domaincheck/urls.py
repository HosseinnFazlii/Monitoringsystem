from django.urls import path , include
from domaincheck.views import ping_view

#app_name='website'

urlpatterns1 = [
    
    path('',ping_view,name='ping'),
    
]
