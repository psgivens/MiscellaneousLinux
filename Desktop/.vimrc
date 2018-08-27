
set relativenumber
set tabstop=2
set expandtab

set runtimepath^=~/.vim/bundle/ctrlp.vim

execute pathogen#infect()
let g:slime_target = "tmux"

" This is necessary for slime to work when Powershell is the default shell. 
set shell=/bin/bash

