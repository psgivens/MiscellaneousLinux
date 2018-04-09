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






