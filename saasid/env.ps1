#!/usr/bin/pwsh-preview

# Import the AWS modules
Import-Module AWSPowerShell.NetCore

# Set to the current profile
Set-AWSCredentials -ProfileName "pp-psg"

# Should print the same profile name as above.
Write-Host "Current profile is: $StoredAWSCredentials"

# Set the default region
Set-DefaultAWSRegion -Region "us-east-2"

Write-Host ("Current region is: " + (Get-DefaultAWSRegion))

