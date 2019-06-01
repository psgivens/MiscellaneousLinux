#!/usr/bin/pwsh

Invoke-RestMethod -Uri 'http://localhost:8080/api/v1/namespaces/default/pods/myactors-0/proxy/'

Invoke-RestMethod -Uri 'http://localhost:8080/api/v1/namespaces/default/pods/myactors-1/proxy/'

$body = @{
    'foo'= 'somevalue'
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Body $body `
    Uri 'http://localhost:8080/api/v1/namespaces/default/pods/myactors-1/proxy/'


kubectl run -it srvlookup `
  --image=tutum/dnsutils `
  --rm `
  --restart=Never -- ping myactors-0.myactors.default.svc.cluster.local


kubectl run -it srvlookup `
  --image=tutum/dnsutils `
  --rm `
  --restart=Never -- dig SRV myactors.default.svc.cluster.local





