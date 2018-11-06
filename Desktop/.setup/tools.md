

# Optional Tools

### Docker

    sudo apt install -y docker.io
    sudo apt install -y docker

### Minikube

    curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.30.0/minikube-linux-amd64 \
      && chmod +x minikube \
      && sudo mv minikube /usr/local/bin/
    
    minikube start
    
    stable=$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)
    echo https://storage.googleapis.com/kubernetes-release/release/$stable/bin/linux/amd64/kubectl 
    
    curl -LO https://storage.googleapis.com/kubernetes-release/release/$stable/bin/linux/amd64/kubectl \
      && chmod +x kubectl \
      && sudo mv kubectl /usr/local/bin/

## Development Envronments

### Powershell Ubuntu 17.04

    # Import the public repository GPG keys
    curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
    # Register the Microsoft Ubuntu repository
    curl https://packages.microsoft.com/config/ubuntu/17.04/prod.list | sudo tee /etc/apt/sources.list.d/microsoft.list
    # Update the list of products
    sudo apt-get update
    # Install PowerShell
    sudo apt-get install -y powershell
    
    # https://github.com/PowerShell/PowerShell/blob/master/docs/learning-powershell/using-vscode.md#editing-with-vs-code
    pwsh -c "Update-Help"


### Powershell Ubuntu 18.04

    # Download the Microsoft repository GPG keys
    wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb
    
    # Register the Microsoft repository GPG keys
    sudo dpkg -i packages-microsoft-prod.deb
    
    # Update the list of products
    sudo apt-get update
    
    # Install PowerShell
    sudo apt-get install -y powershell
    
    # Start PowerShell
    pwsh

### Powershell Azure

    sudo pwsh-preview 

    Install-Module AzureRM.NetCore
   
### Powershell and cloud environments

    mkdir ./psmodules
    Save-Module -Name AWSPowerShell.NetCore -Path ./psmodules/
    Install-Module -Name AWSPowerShell.NetCore -Scope CurrentUser
    Save-Module -Path ./psmodules/ -Name DockerMsftProvider
    Install-Module -Name DockerMsftProvider -Scope CurrentUser

### python-pip

    sudo apt install -y python-pip
    
### Node/npm

    sudo apt install -y npm

### yarn

    #    #curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    #    #echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    #    #sudo apt update && sudo apt install -y yarn


### dotnet core

    wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb

    sudo apt-get update

    sudo apt-get install -y apt-transport-https

    sudo apt-get install -y dotnet-sdk-2.1
    
### Java

    sudo apt install -y default-jdk
    echo 'JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/"' | sudo tee -a /etc/environment

### JSON Query

    sudo apt install -y jq
    
### Sqlite

    sudo apt-get install -y sqlite3 libsqlite3-dev

### AWS CLI

    sudo pip install -U awscli
    aws configure # get & use access key/secret from console

## Graphical environments

### Visual Studio Code

    curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
    sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
    sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
    sudo apt update
    sudo apt install -y code    


### Azure CLI 
    #AZ_REPO=$(lsb_release -cs)
    #echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" | \
        #sudo tee /etc/apt/sources.list.d/azure-cli.list
   
    #curl -L https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
    
    #sudo apt-get install apt-transport-https
    sudo apt-get update && sudo apt-get install azure-cli
    
### Atom

    #curl -L https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -
    #sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'
    #sudo apt-get update
    #sudo apt install -y atom
    

















