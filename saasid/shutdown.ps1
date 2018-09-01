
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

Remove-CFNStack -StackName $cfnarn

$stack1=$null
Do {
  Start-Sleep -s 10
  Clear-Host
  write-host "Getting CFN Stack"
  Get-Date
  $stack2 = $stack1
  $stack1 = Get-CFNStack | ?{ $_.StackId -eq $cfnarn }
  $stack1
} while ($stack1.StackStatus -eq "DELETE_IN_PROGRESS")




