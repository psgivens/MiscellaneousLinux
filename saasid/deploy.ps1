#!/usr/bin/pwsh-preview

# Import the AWS modules
Import-Module AWSPowerShell.NetCore

$shouldExit = $false
if (-not $StoredAWSCredentials) {
  Write-Error "Set credentials with Set-AWSCredentials"
  $shouldExit = $true
}

if (-not (Get-DefaultAWSRegion)) {
  Write-Error "Set default region with Set-DefaultAWSRegion"
  $shouldExit = $true
}

if ($shouldExit) {
  exit 
}

# Should print the same profile name as above.
Write-Host "Current profile is: $StoredAWSCredentials"
Write-Host ("Current region is: " + (Get-DefaultAWSRegion))

$cfn_template = "https://aws-quickstart.s3.amazonaws.com/saas-identity-cognito/templates/saas-identity-cognito-master.template"

# Execute this to test
# Test-CFNTemplate -TemplateURL $cfn_template 

$params = cat ./parameters.json | ConvertFrom-Json

$cfnarn = New-CFNStack `
  -TemplateUrl $cfn_template `
  -Capability 'CAPABILITY_NAMED_IAM' `
  -Stackname 'SaaS-identity-with-Cognito' `
  -Parameter $params

$cfnarn | Tee-Object -FilePath 'cfn.arn'

Start-Sleep -s 10

. ./status.ps1



 
