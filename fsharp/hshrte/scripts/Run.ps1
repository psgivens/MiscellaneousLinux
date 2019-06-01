
$body = @{
    'foo'= 'somevalue1'
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Body $body `
    -Uri 'http://localhost:2080'


$body = @{
    'foo'= 'somevalue2'
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Body $body `
    -Uri 'http://localhost:2080'

$body = @{
    'foo'= 'somevalue3'
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Body $body `
    -Uri 'http://localhost:2080'

$body = @{
    'foo'= 'somevalue4'
} | ConvertTo-Json

Invoke-RestMethod `
    -Method Post `
    -Body $body `
    -Uri 'http://localhost:2080'
