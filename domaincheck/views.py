from django.shortcuts import render
from django.http import HttpResponse
from .models import domain
from ping3 import ping, verbose_ping
# Create your views here.

def ping_view(request):
    # Get all domains from the 'domain' model
    domains = domain.objects.all()

    # Initialize a list to store domains with timeout
    results_dict = {}

    # Create a Ping3 object
   

    # Iterate through each domain and check for timeout
    for domain_obj in domains:
        domain_name = domain_obj.domain_name
        response = ping(domain_name,unit='ms')

        # Check if the response is None (indicating timeout)
        results_dict[domain_name] = response
        # Inside your ping_view function
        print(results_dict)

        context={'results_dict': results_dict} 

    # Render a template with
    #  the list of domains with timeout
    return render(request, 'domainchek/ping_results.html', context)