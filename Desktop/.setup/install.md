#!/bin/sh



exit


### Utils
```

sudo apt install -y docker.io docker jq
sudo apt install -y python-pip

sudo apt-get install -y p7zip-full

# https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

```
#sudo apt install -y flashplugin-installer


### Docker Compose
https://docs.docker.com/compose/install/#install-compose
https://docs.docker.com/compose/completion/
 
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo curl -L https://raw.githubusercontent.com/docker/compose/1.21.2/contrib/completion/bash/docker-compose -o /etc/bash_completion.d/docker-compose


# TODO: Install dropbox through Ubuntu software center
# https://www.pwsafe.org/readmore.shtml

# install java
sudo apt install -y default-jdk

echo 'JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64/"' | sudo tee -a /etc/environment
#echo 'JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/"' | sudo tee -a /etc/environment



# tmux conf is based on this: https://gist.github.com/spicycode/1229612
# install .tmux.conf

# create .vimrc file from git repo


# Visual Studio Code

curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'

sudo apt update

sudo apt install -y code


# Atom

curl -L https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'

sudo apt-get update

sudo apt install -y atom


# ao app for microsoft TODO
snap install ao


sudo apt-get install -y sqlite3 libsqlite3-dev


# Import the public repository GPG keys
curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -

# Register the Microsoft Ubuntu repository
# Uncomment one of the following
    #curl https://packages.microsoft.com/config/ubuntu/17.04/prod.list | sudo tee /etc/apt/sources.list.d/microsoft.list

    curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | sudo tee /etc/apt/sources.list.d/microsoft.list

# Update the list of products
sudo apt-get update

# Install PowerShell
sudo apt-get install -y powershell

# Start PowerShell
#pwsh


# install eclipse
# install DB Browser for Sqlite
# install "meld" through "Ubuntu Software" 
# install xmind

## I don't know what this is
# complete -C aws_completer aws
# echo complete -C aws_completer aws



# install aws cli

sudo pip install -U awscli




# https://github.com/PowerShell/PowerShell/blob/master/docs/learning-powershell/using-vscode.md#editing-with-vs-code
pwsh -c "Update-Help"


##########################################
# Powershell and cloud environments
##########################################
Save-Module -Name AWSPowerShell.NetCore -Path ./psmodules/
Install-Module -Name AWSPowerShell.NetCore -Scope CurrentUser
Save-Module -Path ./psmodules/ -Name DockerMsftProvider
Install-Module -Name DockerMsftProvider -Scope CurrentUser

##########################################
# Install Apache/PHP
##########################################
#sudo ufw allow in "Apache Full"
#sudo apt install libapache2-mod-php7.1 php-mcrypt php-pgsql
#https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04
#sudo apache2ctl configtest


sudo apt install -y go 
# Add GOPATH to .profile

go get -u github.com/govend/govend


#https://www.dropbox.com/install-linux

# Install through 'Ubuntu Software'
# * Password Safe (Bruce Schneier)

sudo apt install -y meld
git config --global diff.tool meld
git config --global difftool.prompt false

sudo snap install slack
sudo snap install postman

sudo apt install -y gnome-shell-pomodoro
