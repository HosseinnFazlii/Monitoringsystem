from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from .models import server,domaininfo
import paramiko
import re
import json

# Create your views here.
def cfip(request,server_id):
    
    server1 = get_object_or_404(server,pk=server_id)
#sshhandler
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(server1.address, username='root', password=server1.password)
#command proccess
    command="python3 shod2.py"
    stdin, stdout,stderr = ssh_client.exec_command("python3 shod2.py")
    bashoutput= stdout.read().decode()
#filter bashoutput
    start_success_line = None
    for line in bashoutput.split('\n'):
        if "[INF] x-ui Started Successfully" in line:
            start_success_line = line

# Extracting the line containing "preferred IP"
    
    preferred_ip_match = re.search(r'preferred IP (\d+\.\d+\.\d+\.\d+)', bashoutput)
    preferred_ip_line = preferred_ip_match.group() if preferred_ip_match else None
#context
    context={'preferred_ip_line': preferred_ip_line,'start_success_line':start_success_line}
    return render(request, 'cfip/cfip.html', context)


#servers info 
def servers_view(request):
    servers = server.objects.all()
    context={'servers':servers}
    
    return render(request,'servers/servers.html',context)


#server info 
def server_view(request,server_id):
     server1 = get_object_or_404(server,pk=server_id)
     context={'server': server1}
    
     return render(request, 'server/server.html', context)



#change domain


def changedomain(request):
    
    servers = server.objects.all()
    context={'servers':servers}
    
    return render(request,'domainchange/serverlist.html',context)


#page for select what domain should be

def changedomaininfo(request,server_id):
    
    server1 = get_object_or_404(server,pk=server_id)
    domains=domaininfo.objects.all()

    context = {'server1': server1,'domains':domains}

    return render(request, 'domainchange/server.html', context)

#view to handel ssh and change domain


def mainchangedomain(request,server_id,domain_id):
    server1 = get_object_or_404(server,pk=server_id)
    domain = get_object_or_404(domaininfo,pk=domain_id)
    uuid=domain.uuid
    servername=domain.servername
    host=domain.host

    try:
        # Connect to the remote VPS via SSH
        with paramiko.SSHClient() as ssh:
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

            # Replace 'your_vps_ip', 'your_ssh_username', and 'your_ssh_password' with actual values
            ssh.connect(server1.address, username='root', password=server1.password)

            # Construct the command with input parameters
            command_args = [
                'python3',
                'shod3.py',
                uuid,
                servername,
                host,
            ]

            # Join the command arguments into a single string
            command = ' '.join(command_args)

            # Execute the command on the remote VPS
            stdin, stdout, stderr = ssh.exec_command(command)

            # Read the output and error (if any) from the command
            output = stdout.read().decode('utf-8')
            error = stderr.read().decode('utf-8')

            # Check for errors or handle the output as needed
            if error:
                return HttpResponse(f"Error executing script: {error}")

    except Exception as e:
        return HttpResponse(f"Error: {str(e)}")
    #handle output
    if "[INF] x-ui Started Successfully" in output:
        status='x-ui Started Successfully(\U0001F7E2)'
    else:
        status='x-ui Started Not Successfully (\U0001F534)'
    #context    
    context={'status': status }
    # Render the 'status.html' template with the script output
    return render(request, 'domainchange/status.html', context)
    