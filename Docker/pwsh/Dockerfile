FROM microsoft/powershell
RUN apt update && apt install -y vim tmux git curl 
COPY ./root /root
WORKDIR /workspace
RUN chsh -s /usr/bin/pwsh
ENTRYPOINT ["pwsh"]

  
