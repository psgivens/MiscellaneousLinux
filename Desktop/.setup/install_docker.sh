#!/usr/bin/sh

clear
sudo apt remove docker docker-engine docker.io

clear
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

clear
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

clear
sudo apt-key fingerprint 0EBFCD88

clear
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

clear
sudo apt-get update

clear
sudo apt-get install -y docker-ce

clear
apt-cache madison docker-ce

clear
sudo docker run hello-world

clear
sudo docker run -it ubuntu bash


exit

sudo apt install pass

sudo mkdir -p /opt/docker/bin

wget https://github.com/docker/docker-credential-helpers/releases/download/v0.6.0/docker-credential-pass-v0.6.0-amd64.tar.gz \
  && tar -xf docker-credential-pass-v0.6.0-amd64.tar.gz \
  && chmod +x docker-credential-pass \
  && sudo mv docker-credential-pass /opt/docker/bin \
  && sudo ln -s /opt/docker/bin/docker-credential-pass /usr/local/bin/

sudo apt install 



## Credentials
# https://github.com/docker/docker-credential-helpers/issues/102
