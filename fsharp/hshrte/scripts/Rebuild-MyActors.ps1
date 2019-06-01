#!/usr/bin/pwsh

kubectl delete -f ./kubia-service-headless.yaml

kubectl delete -f ./kubia-statefulset.yaml

kubectl delete -f ./kubia-service-public.yaml

docker build -t localhost:32000/myactors -f Dockerfile .

docker push localhost:32000/myactors

kubectl create -f ./kubia-service-headless.yaml

kubectl create -f ./kubia-statefulset.yaml

kubectl create -f ./kubia-service-public.yaml

