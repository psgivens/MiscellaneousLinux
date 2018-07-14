#!/bin/bash



###
# Objectives 
#   --- 
# 1. Preserve my tmux session across reboots
# 2. Launch powershell on at least one terminal
###

sudo docker run \
  --name=mypwsh \
  --mount type=bind,source=$(echo ~/learn/hars/),destination=/workspace \
  --rm \
  -it \
  --workdir=/workspace/ \
  mypwsh

 
