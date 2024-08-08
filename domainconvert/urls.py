from django.urls import path
from .views import list_past_domains, select_new_domain, convert_domain

urlpatterns = [
    path('', list_past_domains, name='list_past_domains'),
    path('select_new_domain/<int:domain_id>/', select_new_domain, name='select_new_domain'),
    path('convert/<int:domain_id>/<int:new_domain_id>/', convert_domain, name='convert_domain'),
]
