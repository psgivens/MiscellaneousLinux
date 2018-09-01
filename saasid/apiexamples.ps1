





$domain = 'https://qo9jvddcy2.execute-api.us-east-2.amazonaws.com'
$uri = $domain + '/prod/auth'


$headers = @{
Host= 'qo9jvddcy2.execute-api.us-east-2.amazonaws.com';
Accept='application/json, text/plain, */*'
'Accept-Language'= 'en-GB,en;q=0.5'
'Accept-Encoding'= 'gzip, deflate, br'
Referer= $domain + '/'
Origin=  $domain 
Connection= 'keep-alive'
}

$body = '{"userName":"Phillip.Givens@PatientPop.com","password":"Password1"}'

$token = Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -Body $body -ContentType 'application/json'

$useruri = $domain + '/prod/users'

$newheader = $headers

$newheader['Authorization']='Bearer ' + $token.token

Invoke-RestMethod -Method Get -Uri $useruri -Headers $headers





