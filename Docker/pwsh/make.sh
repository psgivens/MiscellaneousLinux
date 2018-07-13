#!/bin/bash

rm -rf ./root
mkdir ./root
cp -rL ~/.vim ~/.vimrc ~/.tmux.conf ./root
sudo docker build -t mypwsh .

