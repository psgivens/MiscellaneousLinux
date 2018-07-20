

PS1="#> "

### Take inventory
    clear
    sudo docker network list | grep tracker
    sudo docker volume list | grep pomodoro
    sudo docker container list -a | grep -E "NAMES|pomodoro|pgadmin|tracker|dbg"

    sudo docker image list

### Start existing contaienrs

    sudo docker container start pomodoro-pgsql

    sudo docker container start pgadmin_dock

    sudo docker container start pomodoro-wapi

### Starting temporary container. Self removing
    # Cannot attach a debugger, but can have the app auto reload during development.
    # https://github.com/dotnet/dotnet-docker/blob/master/samples/dotnetapp/dotnet-docker-dev-in-container.md
    sudo docker run \
      --name pomodoro-wapi-dbg \
      --rm -it -p 5001:80 \
      --network tracker-net \
      -v ~/Repos/psgivens/misc.git/Tracker/PomodoroApi/:/app/ \
      -w /app/PomodoroApi \
      microsoft/dotnet:2.1-sdk \
      dotnet watch run

### Removing containers

    sudo docker container stop pomodoro-pgsql
    sudo docker container rm pomodoro-pgsql

    sudo docker container stop pomodoro-wapi
    sudo docker container rm pomodoro-wapi

    sudo docker container stop pgadmin_tracker
    sudo docker container rm pgadmin_tracker

### Replace the volume
    sudo docker volume rm pomodoro_pgsql
    sudo docker volume create pomodoro_pgsql

### Running the database container

    # run the database container
    # https://hub.docker.com/_/postgres/
    sudo docker run \
      --name pomodoro-pgsql \
      --mount source=pgs_tracker,target=/var/lib/postgresql/data/pgdata \
      --network tracker-net \
      --rm \
      -p 5432:5432 \
      -e POSTGRES_PASSWORD=Password1 \
      -e POSTGRES_USER=samplesam \
      -e POSTGRES_DB=defaultdb \
      -e PGDATA=/var/lib/postgresql/data/pgdata \
      -d \
      pomodoro-pgsql

### Run the WeightTracker continer
    sudo docker run \
      --name pomodoro-wapi \
      --network tracker-net \
      -p 5003:80 \
      pomodoro-wapi

### Create the network
    sudo docker network create --driver bridge tracker-net

### Build the wt container
    sudo docker build -t pomodoro-wapi -f PomodoroApi/Dockerfile PomodoroApi
  
### Build the pgsql database

    sudo docker build -t pomodoro-pgsql -f pgsql/Dockerfile ./pgsql

### Run the pgadmin container 

    #sudo docker pull dpage/pgadmin4
    sudo docker run \
      -it -p 5002:80 \
      --rm \
      --name pgadmin_tracker \
      --network tracker-net \
      -e "PGADMIN_DEFAULT_EMAIL=user@domain.com" \
      -e "PGADMIN_DEFAULT_PASSWORD=Password1" \
      dpage/pgadmin4

    # run bash in the database container
    sudo docker exec -it pomodoro-pgsql bash

### While logged into database container

    psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB"
    
### Create the migration

    # Required dotnet-sdk-2.1.300
    dotnet ef migrations add InitialMigration
    dotnet ef database update







