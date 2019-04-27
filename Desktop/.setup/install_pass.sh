#!/usr/bin/sh

sudo apt install -y pass

sudo mkdir -p /opt/docker/bin

wget https://github.com/docker/docker-credential-helpers/releases/download/v0.6.0/docker-credential-pass-v0.6.0-amd64.tar.gz \
  && tar -xf docker-credential-pass-v0.6.0-amd64.tar.gz \
  && chmod +x docker-credential-pass \
  && sudo mv docker-credential-pass /opt/docker/bin \
  && sudo ln -s /opt/docker/bin/docker-credential-pass /usr/local/bin/
  && sudo apt-get install -y pass gpg

exit

# User "Phillip Scott Givens" and password in bitwarden
gpg2 --gen-key

#pass init "269FEEBEE82FCE5D5CF361F398E8CFB1B84CAC37"
pass init "31A02969FBA9FA1B5596B6091723F2E6B593E520"

pass insert docker-credential-helpers/docker-pass-initialized-check

(Set it as "pass")

pass show docker-credential-helpers/docker-pass-initialized-check

docker-credential-pass list






## Credentials
# https://github.com/docker/docker-credential-helpers/issues/102
