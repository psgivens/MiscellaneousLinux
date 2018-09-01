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

$parameters = cat ./parameters.json | ConvertFrom-Json

Measure-CFNTemplateCost `
  -TemplateUrl $cfn_template `
  -Parameters $parameters

 
