FROM microsoft/dotnet:2.2-sdk as build-env

RUN apt update && apt install -y unzip
RUN mkdir -p /vsdbg
RUN curl -sSL https://aka.ms/getvsdbgsh \
  | /bin/sh /dev/stdin -v latest -l /vsdbg

WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.fsproj ./
RUN dotnet restore

# copy everything else and build
COPY . ./
RUN dotnet publish -c Debug -o out

# build runtime image
FROM microsoft/dotnet:2.2-aspnetcore-runtime 
RUN mkdir /vsdbg
COPY --from=build-env /vsdbg/ /vsdbg/

WORKDIR /app
COPY --from=build-env /app/out/ .
ENTRYPOINT ["dotnet", "MyActors.dll"]

