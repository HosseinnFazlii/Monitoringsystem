from django.shortcuts import render, get_object_or_404, redirect
from servers.models import domaininfo
from .models import ConvertDomain
import requests
import json
import paramiko
from decouple import config

def list_past_domains(request):
    past_domains = domaininfo.objects.all()
    return render(request, 'domainconvert/list_past_domains.html', {'past_domains': past_domains})

def select_new_domain(request, domain_id):
    past_domain = get_object_or_404(domaininfo, pk=domain_id)
    new_domains = ConvertDomain.objects.all()
    return render(request, 'domainconvert/select_new_domain.html', {'past_domain': past_domain, 'new_domains': new_domains})

def write_to_remote_server(host, port, username, password, cert, cert_path, key, key_path):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, port=port, username=username, password=password)
    sftp = ssh.open_sftp()
    with sftp.open(cert_path, 'w') as cert_file:
        cert_file.write(cert)
    with sftp.open(key_path, 'w') as key_file:
        key_file.write(key)
    sftp.close()
    ssh.close()

def convert_domain(request, domain_id, new_domain_id):
    past_domain = get_object_or_404(domaininfo, pk=domain_id)
    new_domain = get_object_or_404(ConvertDomain, pk=new_domain_id)
    
    subdomain = past_domain.servername
    specific_id = past_domain.specificid
    ip_address = past_domain.ipaddress
    new_rootdomain = new_domain.rootdomain
    new_subdomain = new_domain.host
    new_zone_id = new_domain.zoneid
    login_url = f'http://{ip_address}:54321/login'
    list_url = f'http://{ip_address}:54321/panel/inbound/list'
    update_base_url = f'http://{ip_address}:54321/panel/inbound/update/'

    errors = []
    status_messages = []

    try:
        # Use the certificate and key from the new domain
        certificate = new_domain.certificate
        private_key = new_domain.private_key
        
        # Write the certificate and key to the remote server
        write_to_remote_server(ip_address, 22, 'root', 'SaraHossein@xyz@Fazli', certificate, '/root/cert.crt', private_key, '/root/private.key')
        status_messages.append(f'Successfully uploaded certificate for {new_rootdomain} to the server')

        # Update x-ui panel with new domain info
        login_data = {
            'username': config('SSH_USERNAME'),
            'password': config('SSH_PASSWORD'),
        }
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
                        stream_settings['tlsSettings']['serverName'] = new_subdomain
                        stream_settings['wsSettings']['host'] = new_subdomain
                        stream_settings['tlsSettings']['certificates'] = [{
                            "certificateFile": "/root/cert.crt",
                            "keyFile": "/root/private.key"
                        }]

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
        errors.append(f'Error uploading certificate or updating inbounds: {str(e)}')

    # Update domaininfo in the database
    if not errors:
        past_domain.name = new_subdomain
        past_domain.zoneid = new_zone_id
        past_domain.servername=new_subdomain
        past_domain.host=new_subdomain
        past_domain.save()
        status_messages.append(f'Domain info updated successfully for {new_subdomain}')


        # new_domain.delete()
        # status_messages.append(f'New domain {new_subdomain} has been deleted from the database.')

    return render(request, 'domainconvert/convert.html', {'status_messages': status_messages, 'errors': errors})
