
$env:POMODORO_REPOS= "{0}/Repos/psgivens" -f (ls -d ~)
$env:MSBuildSDKsPath= "/usr/share/dotnet/sdk/2.2.402/Sdks"
$env:PATH= $env:PATH, "/snap/bin" -join ':'
$env:PATH= $env:PATH, "$env:POMODORO_REPOS/Architecture/scripts" -join ':'
$env:PATH= "$env:HOME/bin", $env:PATH -join ':'




