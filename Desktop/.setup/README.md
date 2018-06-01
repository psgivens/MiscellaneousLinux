
# Bootstrapping the environment

Before we can use the install scripts from tmux and vim, we need the scripts on the system

### Install tools
If you paste all of the following, it may not complete because packages may take a while to install. 

    sudo apt update
    sudo apt install -y git
    sudo apt install -y curl
    sudo apt install -y vim
    sudo apt install -y tmux

###############################################
### Git this repo
################################################

    mkdir -p ~/Repos/psgivens
    cd ~/Repos/psgivens
    git clone https://github.com/psgivens/MiscellaneousLinux.git misc.git
    cd misc.git/Desktop

###############################################
### Symbolic link config files
################################################
   
    ln -s "$(pwd)/.vimrc" ~/.vimrc
    ln -s "$(pwd)/.tmux.conf" ~/.tmux.conf

    
###############################################
### Configure vim for pathogen
################################################

    mkdir -p ~/.vim/autoload ~/.vim/bundle && \
    curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim

###############################################
### Install vim environment
################################################

    git clone https://github.com/ctrlpvim/ctrlp.vim.git ~/.vim/bundle/ctrlp.vim
    git clone https://github.com/jpalardy/vim-slime.git ~/.vim/bundle/vim-slime
    git clone https://github.com/mattn/emmet-vim.git ~/.vim/bundle/emmet-vim
    
    
###############################################
### Use slime to install rest
################################################
    
    cd .setup
    tmux 
    vim install.sh
    
    
    
    
    
