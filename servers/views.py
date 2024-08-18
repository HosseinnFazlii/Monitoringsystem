from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import server, domaininfo
import paramiko
import re
import json
from decouple import config
import requests

# Suppress only the single InsecureRequestWarning from urllib3 needed
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Create your views here.
def cfip(request, server_id):
    server1 = get_object_or_404(server, pk=server_id)

    # ssh handler
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(server1.address, username='root', password=server1.password)
    
    # command process
    command = "python3 shod2.py"
    stdin, stdout, stderr = ssh_client.exec_command(command)
    bashoutput = stdout.read().decode()
    
    # filter bashoutput
    start_success_line = None
    for line in bashoutput.split('\n'):
        if "[INF] x-ui Started Successfully" in line:
            start_success_line = line
    
    # Extracting the line containing "preferred IP"
    preferred_ip_match = re.search(r'preferred IP (\d+\.\d+\.\d+\.\d+)', bashoutput)
    preferred_ip_line = preferred_ip_match.group() if preferred_ip_match else None
    
    # context
    context = {'preferred_ip_line': preferred_ip_line, 'start_success_line': start_success_line}
    return render(request, 'cfip/cfip_status.html', context)

# servers info 
def servers_view(request):
    servers = server.objects.all()
    context = {'servers': servers}
    return render(request, 'servers/mainserver.html', context)


# server info 
def server_view(request, server_id):
    server1 = get_object_or_404(server, pk=server_id)
    domains = domaininfo.objects.all()
    context = {'server': server1, 'domains': domains}
    return render(request, 'server/mainserver.html', context)

def mainchangedomain(request, server_id, domain_id):
    server1 = get_object_or_404(server, pk=server_id)
    domain = get_object_or_404(domaininfo, pk=domain_id)
    uuid = domain.uuid
    servername = domain.servername
    host = domain.host
    port = domain.port
    domainname = domain.name

    try:
        # Connect to the remote VPS via SSH
        with paramiko.SSHClient() as ssh:
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh.connect(server1.address, username='root', password=server1.password)

            # Construct the command with input parameters
            command_args = ['python3', 'shod5.py', uuid, servername, host, port]
            command = ' '.join(command_args)

            # Execute the command on the remote VPS
            stdin, stdout, stderr = ssh.exec_command(command)
            output = stdout.read().decode('utf-8')
            error = stderr.read().decode('utf-8')

            # Check for errors or handle the output as needed
            if error:
                return HttpResponse(f"Error executing script: {error}")

    except Exception as e:
        return HttpResponse(f"Error: {str(e)}")
    
    # handle output
    status = 'x-ui Started Successfully (\U0001F7E2)' if "[INF] x-ui Started Successfully" in output else 'x-ui Started Not Successfully (\U0001F534)'
    
    # Extract and increment the numeric part of the domain name
    match = re.search(r'v(\d+)p(.+)', domainname)
    if match:
        num = int(match.group(1))
        suffix = match.group(2)
        new_num = num + 1
        new_domainname = f'v{new_num}p{suffix}'
        
        # Update the domain name in the database
        domain.name = new_domainname
        domain.servername=new_domainname
        domain.host=new_domainname
        domain.save()
    else:
        new_domainname = "Error in domain name format"

    # context    
    context = {
        'status': status,
        'old_domainname': domainname,
        'new_domainname': new_domainname,
        'db_domainname':domain.name
    }
    
    # Render the 'status.html' template with the script output
    return render(request, 'domainchange/status.html', context)
#showdomain list 
def domain_view(request):
    
    domains = domaininfo.objects.all()
    context = { 'domains': domains}
    return render(request, 'server/domainlist.html', context)

#Adsubdomain script
def addsub(request, domain_id):
    domain = get_object_or_404(domaininfo, pk=domain_id)
    subdomain = domain.servername
    specific_id = domain.specificid
    ip_address = domain.ipaddress
    api_token = config('CLOUDFLARE_API_TOKEN')
    zone_id = domain.zoneid
    login_url = f'http://{ip_address}:54321/login'
    list_url = f'http://{ip_address}:54321/panel/inbound/list'
    update_base_url = f'http://{ip_address}:54321/panel/inbound/update/'

    errors = []
    status_messages = []

    try:
        url = f'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records'
        headers = {
            'Authorization': f'Bearer {api_token}',
            'Content-Type': 'application/json'
        }
        data = {
            'type': 'A',
            'name': subdomain,
            'content': ip_address,
            'ttl': 1,
            'proxied': True
        }
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            status_messages.append(f'Successfully created A record for {subdomain} pointing to {ip_address}')
        else:
            errors.append(f'Failed to create A record: {response.status_code} - {response.text}')
    except Exception as e:
        errors.append(f'Error creating A record: {str(e)}')

    try:
        login_data = {
            'username': config('SSH_USERNAME'),
            'password': config('SSH_PASSWORD'),
        }

        # Login to get session cookie
        session = requests.Session()
        login_response = session.post(login_url, data=login_data, verify=False)
        if login_response.status_code == 200:
            status_messages.append('Login successful')

            # Get the list of inbounds
            list_response = session.post(list_url, verify=False)
            if list_response.status_code == 200:
                status_messages.append('Retrieved inbound list successfully')
                inbounds = list_response.json().get('obj', [])
                for inbound in inbounds:
                    if str(inbound['id']) == specific_id:
                        settings = json.loads(inbound['settings'])
                        stream_settings = json.loads(inbound['streamSettings'])

                        # Update the necessary fields
                        stream_settings['tlsSettings']['serverName'] = subdomain
                        stream_settings['wsSettings']['host'] = subdomain

                        update_data = {
                            'up': inbound['up'],
                            'down': inbound['down'],
                            'total': inbound['total'],
                            'remark': inbound['remark'],
                            'enable': inbound['enable'],
                            'expiryTime': inbound['expiryTime'],
                            'listen': inbound['listen'],
                            'port': inbound['port'],
                            'protocol': inbound['protocol'],
                            'settings': json.dumps(settings),
                            'streamSettings': json.dumps(stream_settings),
                            'sniffing': inbound['sniffing']
                        }

                        # Send the update request
                        update_url = f'{update_base_url}{specific_id}'
                        update_response = session.post(update_url, json=update_data, verify=False)

                        if update_response.status_code == 200:
                            status_messages.append(f'Update successful for inbound {specific_id}')
                        else:
                            errors.append(f'Failed to update inbound {specific_id}: {update_response.status_code} - {update_response.text}')
                        break
                else:
                    errors.append(f'ID {specific_id} not found in the list of inbounds.')
            else:
                errors.append(f'Failed to retrieve inbound list: {list_response.status_code} - {list_response.text}')
        else:
            errors.append(f'Login failed: {login_response.status_code} - {login_response.text}')
    except Exception as e:
        errors.append(f'Error during login or updating inbounds: {str(e)}')

    context = {
        'status_messages': status_messages,
        'errors': errors
    }

    return render(request, 'domainchange/status3.html', context)