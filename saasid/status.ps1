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

$cfnarn = cat ./cfn.arn

$stack=$null
Do {
  Clear-Host
  write-host "Getting CFN Stack"
  Get-Date
  $stack = Get-CFNStack | ?{ $_.StackId -eq $cfnarn }
  $stack
  Start-Sleep -s 10
} while ($stack -and $stack.StackStatus -eq "CREATE_IN_PROGRESS")




 
