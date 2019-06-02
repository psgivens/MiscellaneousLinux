

# Optional Tools

    sudo apt install -y htop

### SSH setup

Check the bookmarks in Firefox. Although I have this working, I did not record how I got it to work. 

    # If they don't already exist
    sudo apt install -y openssh-server
    sudo apt install -y openssh-client

    # https://www.kevinkuszyk.com/2016/11/24/ssh-to-a-linux-host-from-windows-10/
    # From the client, you can do this. It will work from WSL
    ssh-keygen -t rsa
    ssh-copy-id {username}@{host}

### Docker

    sudo apt install -y docker.io
    sudo apt install -y docker

### Docker creds


# User "Phillip Scott Givens" and password in bitwarden
gpg2 --gen-key

pass init "269FEEBEE82FCE5D5CF361F398E8CFB1B84CAC37"

pass insert docker-credential-helpers/docker-pass-initialized-check

(Set it as "pass")

pass show docker-credential-helpers/docker-pass-initialized-check

docker-credential-pass list

(You should not see "pass store is uninitialized")

{
    "auths": {
        **SKIPPED**
    },
    "credsStore": "pass"
}

## Development Envronments

### Powershell Azure

    Install-Module AzureRM.NetCore
   
### Powershell and cloud environments

    mkdir ./psmodules
    Save-Module -Name AWSPowerShell.NetCore -Path ./psmodules/
    Install-Module -Name AWSPowerShell.NetCore -Scope CurrentUser
    Save-Module -Path ./psmodules/ -Name DockerMsftProvider
    Install-Module -Name DockerMsftProvider -Scope CurrentUser

### Node/npm

    sudo apt install -y npm -g
    sudo apt install -y typescript -g

### yarn

    #    #curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    #    #echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    #    #sudo apt update && sudo apt install -y yarn


### dotnet core

    wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb

    sudo apt-get update

    sudo apt-get install -y apt-transport-https

    sudo apt-get install -y dotnet-sdk-2.2
    
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

    $AZ_REPO=$(lsb_release -cs)

    echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" `
      | sudo tee /etc/apt/sources.list.d/azure-cli.list
   
    curl -L https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
    
    sudo apt-get install apt-transport-https

    sudo apt-get update 

    sudo apt-get install azure-cli
    
### Atom

    #curl -L https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -
    #sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'
    #sudo apt-get update
    #sudo apt install -y atom
    

















