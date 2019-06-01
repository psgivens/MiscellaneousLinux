#!/usr/bin/pwsh

Invoke-RestMethod -Uri 'http://localhost:8080/api/v1/namespaces/default/pods/myactors-0/proxy/'

Invoke-RestMethod -Uri 'http://localhost:8080/api/v1/namespaces/default/pods/myactors-1/proxy/'

$body = @{
    'foo'= 'somevalue'
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Body $body `
    -Uri 'http://localhost:8080/api/v1/namespaces/default/pods/myactors-1/proxy/'
