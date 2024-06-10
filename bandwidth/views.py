import requests
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Server, BandwidthUsage, BandwidthInUsage, BandwidthOutUsage
from datetime import datetime


def bandwidth_usage_view(request, server_id):
    server = get_object_or_404(Server, id=server_id)
    
    # Get the current month in the format YYYYMM
    current_month = datetime.now().strftime('%Y%m')
    
    # Fetch the bandwidth data from the API
    API_URL = f"http://{server.panel_ipaddress}:4082/index.php"
    params = {
        'act': 'bandwidth',
        'show': current_month
    }
    try:
        response = requests.get(API_URL, params=params, auth=(server.api_key, server.api_password))
        response.raise_for_status()  # Raise an HTTPError on bad response
        data = response.json()
        print("Response content:", response.content)
    except requests.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
    except ValueError as e:
        return JsonResponse({'error': 'Invalid JSON response from the server'}, status=500)
    
    # Check if response contains valid data
    if not data or 'bandwidth' not in data:
        return JsonResponse({'error': 'Empty or malformed response from the server'}, status=500)
    
    bandwidth_data = data['bandwidth']
    
    # Update or create the bandwidth usage entry
    bandwidth_usage, created = BandwidthUsage.objects.update_or_create(
        server=server,
        defaults={
            'limit': float(bandwidth_data.get('limit', 0)),
            'used': float(bandwidth_data.get('used', 0)),
            'free': float(bandwidth_data.get('limit', 0)) - float(bandwidth_data.get('used', 0)),
            'limit_gb': float(bandwidth_data.get('limit_gb', 0)),
            'used_gb': float(bandwidth_data.get('used_gb', 0)),
            'free_gb': float(bandwidth_data.get('free_gb', 0)),
            'percent': float(bandwidth_data.get('percent', 0)),
            'percent_free': float(bandwidth_data.get('percent_free', 0))
        }
    )

    # Update or create the in-bandwidth usage entry
    in_bandwidth_data = bandwidth_data.get('in', {})
    BandwidthInUsage.objects.update_or_create(
        bandwidth_usage=bandwidth_usage,
        defaults={
            'usage': in_bandwidth_data.get('usage', {}),
            'used': float(in_bandwidth_data.get('used', 0)),
            'limit': float(in_bandwidth_data.get('limit', 0)),
            'free': float(in_bandwidth_data.get('free', 0)),
            'limit_gb': float(in_bandwidth_data.get('limit_gb', 0)),
            'used_gb': float(in_bandwidth_data.get('used_gb', 0)),
            'free_gb': float(in_bandwidth_data.get('free_gb', 0)),
            'percent': float(in_bandwidth_data.get('percent', 0)),
            'percent_free': float(in_bandwidth_data.get('percent_free', 0))
        }
    )

    # Update or create the out-bandwidth usage entry
    out_bandwidth_data = bandwidth_data.get('out', {})
    BandwidthOutUsage.objects.update_or_create(
        bandwidth_usage=bandwidth_usage,
        defaults={
            'usage': out_bandwidth_data.get('usage', {}),
            'used': float(out_bandwidth_data.get('used', 0)),
            'limit': float(out_bandwidth_data.get('limit', 0)),
            'free': float(out_bandwidth_data.get('free', 0)),
            'limit_gb': float(out_bandwidth_data.get('limit_gb', 0)),
            'used_gb': float(out_bandwidth_data.get('used_gb', 0)),
            'free_gb': float(out_bandwidth_data.get('free_gb', 0)),
            'percent': float(out_bandwidth_data.get('percent', 0)),
            'percent_free': float(out_bandwidth_data.get('percent_free', 0))
        }
    )
    
    context = {
        'server': server,
        'bandwidth_usage': bandwidth_usage,
        'in_usage': bandwidth_usage.in_bandwidth,
        'out_usage': bandwidth_usage.out_bandwidth
    }
    return render(request, 'bandwidth/bandwidth_usage.html', context)

def server_list_view(request):
    servers = Server.objects.all()
    return render(request, 'bandwidth/server_list.html', {'servers': servers})

