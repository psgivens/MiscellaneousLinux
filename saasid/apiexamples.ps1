



$cfnarn = cat ./cfn.arn

$allstacks = Get-CFNStack

$allstacks | ?{$_.StackName -Match "API"} `
  | Select -Property StackName, @{
    Name="OutputValue"; Expression={$_.Outputs.OutputValue}
}

#https://cin57g1cxh.execute-api.us-east-2.amazonaws.com/prod/product/health
$myhost = $allstacks `
  | ?{$_.StackName -Match "API"} `
  | %{$_.Outputs.OutputValue} `
  | %{$_.split('/')[0]}
$myhost

$domain="https://$myhost"
$uri="$domain/prod/auth"

$headers = @{
  Host=$myhost
  Accept='application/json, text/plain, */*'
  'Accept-Language'= 'en-GB,en;q=0.5'
  'Accept-Encoding'= 'gzip, deflate, br'
  Referer= $myhost + '/'
  Origin=  $myhost 
  Connection= 'keep-alive'
}

$body = @{
  userName="Phillip.Givens@PatientPop.com"
  password="Password1"
} | ConvertTo-Json
$body

$token = Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -Body $body -ContentType 'application/json'
$token

$useruri = $domain + '/prod/users'

$newheader = $headers.clone()
$newheader['Authorization']='Bearer ' + $token.token
$newheader

Invoke-RestMethod -Method Get -Uri $useruri -Headers $newheader

mkdir artifacts

$token.token >> artifacts/token.jwt
$token.access >> artifacts/access.jwt


$temp = $token.token.split('.') `
  | Select -First 1 `
  | %{$_ + '='} `
  | %{[System.Convert]::FromBase64String($_) } `
  | %{[System.Text.Encoding]::UTF8.GetString($_) } ` 
$temp -join '' | jq '.' > artifacts/token_head.json
$temp -join '' | jq '.' 

$temp = $token.token.split('.') `
  | Select -Skip 1 -First 1 `
  | %{$_ + '=='} `
  | %{[System.Convert]::FromBase64String($_) } `
  | %{[System.Text.Encoding]::UTF8.GetString($_) } ` 
$temp -join '' | jq '.' > artifacts/token.json
$temp -join '' | jq '.' 


$temp = $token.access.split('.') `
  | Select -First 1 `
  | %{$_ + '='} `
  | %{[System.Convert]::FromBase64String($_) } `
  | %{[System.Text.Encoding]::UTF8.GetString($_) } ` 
$temp -join '' | jq '.' > artifacts/access_head.json
$temp -join '' | jq '.' 

$temp = $token.access.split('.') `
  | Select -Skip 1 -First 1 `
  | %{$_ + '=='} `
  | %{[System.Convert]::FromBase64String($_) } `
  | %{[System.Text.Encoding]::UTF8.GetString($_) } ` 
$temp -join '' | jq '.' > artifacts/access.json
$temp -join '' | jq '.' 



















