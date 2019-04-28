#!/bin/bash

# Bootstrapping the environment

### Install tools

    sudo apt update
    sudo apt install -y git
    sudo apt install -y curl
    sudo apt install -y vim
    sudo apt install -y tmux

### Git this repo

    mkdir -p ~/Repos/psgivens
    cd ~/Repos/psgivens
    git clone https://github.com/psgivens/MiscellaneousLinux.git misc.git
    cd misc.git/Desktop

### Symbolic link config files
   
    ln -s "$(pwd)/.vimrc" ~/.vimrc
    ln -s "$(pwd)/.tmux.conf" ~/.tmux.conf
    mkdir -p ~/.config/powershell
    ln -s "$(pwd)/.config/powershell/profile.ps1" ~/.config/powershell/profile.ps1
    
### Configure vim for pathogen

    mkdir -p ~/.vim/autoload ~/.vim/bundle && \
    curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim

### Install vim environment

    git clone https://github.com/ctrlpvim/ctrlp.vim.git ~/.vim/bundle/ctrlp.vim
    git clone https://github.com/jpalardy/vim-slime.git ~/.vim/bundle/vim-slime
    git clone https://github.com/mattn/emmet-vim.git ~/.vim/bundle/emmet-vim
    
# Import the public repository GPG keys

    curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
    curl http://packages.microsoft.com/config/ubuntu/18.04/prod.list | sudo tee /etc/apt/sources.list.d/microsoft.list
    sudo apt-get update

    # Install PowerShell
    #sudo apt-get install -y powershell

### Use slime to install rest
    
    cd .setup
    tmux 
    
    
