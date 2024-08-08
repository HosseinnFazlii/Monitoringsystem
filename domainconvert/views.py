from django.shortcuts import render, get_object_or_404, redirect
from servers.models import domaininfo
from .models import ConvertDomain
import requests
import json
import paramiko

def create_cloudflare_cert(api_token, csr, hostnames):
    url = "https://api.cloudflare.com/client/v4/certificates"
    headers = {
        "Content-Type": "application/json",
        "X-Auth-User-Service-Key": api_token
    }
    data = {
        "csr": csr,
        "hostnames": hostnames,
        "request_type": "origin-rsa",
        "requested_validity": 5475
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    if response.status_code == 200 and response.json()['success']:
        return response.json()['result']
    else:
        raise Exception("Failed to create certificate: " + response.text)

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

def list_past_domains(request):
    past_domains = domaininfo.objects.all()
    return render(request, 'domainconvert/list_past_domains.html', {'past_domains': past_domains})

def select_new_domain(request, domain_id):
    past_domain = get_object_or_404(domaininfo, pk=domain_id)
    new_domains = ConvertDomain.objects.all()
    return render(request, 'domainconvert/select_new_domain.html', {'past_domain': past_domain, 'new_domains': new_domains})

def convert_domain(request, domain_id, new_domain_id):
    past_domain = get_object_or_404(domaininfo, pk=domain_id)
    new_domain = get_object_or_404(ConvertDomain, pk=new_domain_id)
    
    subdomain = past_domain.servername
    specific_id = past_domain.specificid
    ip_address = past_domain.ipaddress
    api_token = 'v1.0-781c9e29e650a9143c5d6121-b1337abd6bd9e95464204787ea3dfcaac2ab73024ebdf3767d197036c66ca3c4f1641dbddbbf63e688c8ca971b7091460e76385e919bd38ffe7fc0bdad85e6c2b2a144d841b4531420'
    zone_id = past_domain.zoneid
    new_rootdomain = new_domain.rootdomain
    new_subdomain=new_domain.host
    new_zone_id = new_domain.zoneid
    login_url = f'http://{ip_address}:54321/login'
    list_url = f'http://{ip_address}:54321/panel/inbound/list'
    update_base_url = f'http://{ip_address}:54321/panel/inbound/update/'

    errors = []
    status_messages = []

    csr = """-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIR1V3/FD02QkCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBBFb77Xy2JzNwuVEdKnWDSMBIIE
0Atc4mOfxph148Fi3ce2WyHl1kdH9eoAqbAnTw3tBFYwxtjjCeYlEAC6at6nPN9p
86I1Guiy1zxgiFStO5jRaQIN8n2AEvfomxbW5e1PvYjLs6SWxhLvjMWnatXaduFd
1W67T48w6XaDuSTBOEGdUqL8CsltiZaEIRZIhN7v1BeQavovu6sC7AJ9nZY1Ucbe
8cMN1NqH8MabonXogTUQwXYhUSrqiNJgLT19GZhAHjLwos/KiBrqOsl9iZ4AlMWG
QLOYixU4ut0wGVw1LuM6Z4t8fXdFvGa04eFAoUTnQMXBxVOpOy8ipKMI+QgQPQa0
JFUj+3eCJISD+viR4RH/BIsNl6L3BXhA74gFifeYnjICaiedxIdLLvGmEYT42VO0
CKTSCGekRnhd9lhZ90tmwc+TIEunMQNY2rJs+AIzp8dsEIccKmzxBovfVF8zz+Sq
47BJkoTI2ul21JuqwdyvdT5qK3Lus3zSs3wGPgsTGRdLaQ2DQhkOEwXZHaOq0OZ5
+HLSB/cNLkSRu0+qnjRt6OBQxPtyFCcq/L044ZIrhfJoXctbTGTf9Ljv/QUnOmYr
m7HwuUvv9nDXkpXCpbZNJSO77BFy280uRc/Q59sNcNmhyLpBtGKYyRjeBoliUgqn
VwW/AJOL/hTndTflzPpqv8g1GM//9ic7ExMlu3jtgcgn98qMCoO+bDPk/KqefmFg
Vq2mLIRMiX6Xg+Hq+aDaQ8jS58U2UEbLnKD2MaGM2uGV5IEYI0PAaOlf+b24tY8J
ibUsGmvxhSsAA35529i/VfdVjpm++3hsB8jM7+FsS3b6ziwxYNIvQOJR5z8BTcNg
ID6IEio3ioyY9DBFRmOjmQub0J0T/UpOTaaMzTDu+bV27nLvGWAIMgqOeItwkqyw
GkjFmJNFfVG0EI4TzNZPt0Pod0cOlzjDO/VRGQZzMfYAE+ul6e+RubsdR2e8Yskb
vrW+vNOqC+1tdF5EU8LpgY+13N0ksE7iaf6r5J9qJ0DeBT9810nuDmV1n+3fQxxr
TWpuWDWVp5TICP52EUrkMWQZgPctaAYN1wH/LwAPaPC68BDlSbkN8w0qHV5Bkmpd
uWOocs+CcYUHsWlMqF9irxdiuBhoPyE+ipxhNHwSSfCimeu5cCVJH1/SwKTaoATe
9GIv1EROldY2syWekFkzl9tXAkf9vjM05rC7kV9fqCooYhV51VCfrns3+UmfEzoX
UdGmvUXQhM+qEImxnrbL8HZ2RrnjdMuNfUk8z1QvzbNfS8HrEavVPIdl9V566Pd5
9ZYT4zBkEpow29IjJZS1JDzw5jUbOXat8ib2JAfwbRyFyoTgQs3+Bikzjawa6xf3
7rr8K8CTYNHV62WfJxsgILhgF5aeOVw16AAEPRfRt+tEWV20BlN0OrbsTKNojCkG
tLmkwFM0jJypf3XJvVUD41AIMNCS5acCKx0Tq2BvDxM2DPlCirPVxNMq8JBiQIy/
Dw5ifLLYWJTh5cBXkQ1FgEbAH/1u4LeSbpFwyhr9QQtoXca3PaHyo2pw37BQamIe
WUr4DH0Lo/Bfm4dKnHkl0QVqEYlw+ciP5W4yHc5nLu8CnShGNICe0CUOjyBhYmbf
kBWfTBjxfJHo8qjoVQvqUvbmlighyXZEgru42wH2WR6e
-----END ENCRYPTED PRIVATE KEY-----"""
    private_key = """YOUR_PRIVATE_KEY_HERE"""

    try:
        # Create certificate using Cloudflare API
        cert_data = create_cloudflare_cert(api_token, csr, [new_rootdomain, f'*.{new_rootdomain}'])
        certificate = cert_data['certificate']
        private_key = cert_data['private_key']
        
        # Write the certificate and key to the remote server
        write_to_remote_server(ip_address, 22, 'root', 'SaraHossein@xyz@Fazli', certificate, '/root/cert15.crt', private_key, '/root/private.key')
        status_messages.append(f'Successfully created certificate for {new_rootdomain} and uploaded to server')

        # Update x-ui panel with new domain info
        login_data = {
            'username': 'Admin1',
            'password': 'Sarahossein6@fazli'
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
                            "certificateFile": "/root/cert15.crt",
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
        errors.append(f'Error creating certificate or updating inbounds: {str(e)}')

    # Update domaininfo in the database
    if not errors:
        past_domain.name = new_subdomain
        past_domain.zoneid = new_zone_id
        past_domain.save()
        status_messages.append(f'Domain info updated successfully for {new_subdomain}')

    return render(request, 'domainconvert/convert.html', {'status_messages': status_messages, 'errors': errors})
