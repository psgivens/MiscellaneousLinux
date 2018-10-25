#!/usr/bin/pwsh

Clear-Host

Write-Host "Log into bitwarden as psgivens11@yahoo.com"
bw login 'psgivens11@yahoo.com'

Write-Host "Unlocking the session"
$env:BW_SESSION = bw unlock --raw

Write-Host "Syncing ..."
bw sync 

#$securedValue = Read-Host -AsSecureString
#$bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securedValue)
#$value = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)

$date = Get-Date -Format "yyyyMMdd"
$file = "bitwarden_export_$date.csv"
$encrypt_file = "~/Dropbox/Accounts/bitwarden/$file.gpg"

Write-Host "Exporting ..."
bw export --output $file

Write-Host "Encrypting with gpg"
gpg --recipient psgivens -o $encrypt_file -e $file 

Write-Host ("File: " + $encrypt_file)

Write-Host "Removing local file"
rm $file

