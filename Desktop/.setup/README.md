# Bootstrapping the environment

Before we can use the install scripts from tmux and vim, we need the scripts on the system.
Run the following to install git, curl, vim, tmux, and vim plugins: ctrlp, slime, and emmet.

    sudo apt update \
        && sudo apt install -y curl \
        && curl \
            https://raw.githubusercontent.com/psgivens/MiscellaneousLinux/master/Desktop/.setup/bootstrap.sh \
            | sudo /bin/bash

More can be installed by looking at tools.md            

## Azure Notes

* StorageExplorer requires libgnome-keyring0 (available through apt)

## Visual Studio Code
