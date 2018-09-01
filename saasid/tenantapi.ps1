


$creds = Get-Credential -UserName 'Phillip.Givens@PatientPop.com'

$c = @"{"userName":"Phillip.Givens@PatientPop.com","password":"Password1"}"@

$d = $c | ConvertFrom-Json



# Does not currently work
Invoke-RestMethod `
  -Method POST `
  -Uri "https://qo9jvddcy2.execute-api.us-east-2.amazonaws.com/prod/auth" `
  -Body $c



