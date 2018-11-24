#!/bin/bash

# Before we can work through other installs we need some basic tools. 
echo "Install git, curl, vim, and tmux."
sudo apt update && sudo apt install -y git curl vim tmux

echo "git MiscellaneousLinux.git as misc.git"
mkdir -p ~/Repos/psgivens
cd ~/Repos/psgivens
git clone https://github.com/psgivens/MiscellaneousLinux.git misc.git
cd misc.git/Desktop

echo "Soft links for .vimrc and .tmux.conf" 
echo "This may cause problems if pwsh is not installed."
ln -s "$(pwd)/.vimrc" ~/.vimrc
ln -s "$(pwd)/.tmux.conf" ~/.tmux.conf
    
echo "Install pathogen so that we can install vim plugins"
mkdir -p ~/.vim/autoload ~/.vim/bundle && \
curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim

echo "Installing vim plugins: ctrlp, slime, emmet"
git clone https://github.com/ctrlpvim/ctrlp.vim.git ~/.vim/bundle/ctrlp.vim
git clone https://github.com/jpalardy/vim-slime.git ~/.vim/bundle/vim-slime
git clone https://github.com/mattn/emmet-vim.git ~/.vim/bundle/emmet-vim
    
