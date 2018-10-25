
bw login 'psgivens11@yahoo.com'

$folders = bw list folders | ConvertFrom-Json

$folders | ?{$_.id} | %{ bw delete folder $_.id }

bw sync

$items = bw list items | ConvertFrom-Json

$items `
  | Sort-Object -Property @{Expression={$_.login.password}} `
  | Select -First 5

$items `
  | Sort-Object -Property @{Expression={$_.login.password}} `
  | Select-Object -Property name, `
      @{Name="Username";Expression={$_.login.username}}, `
      @{Name="Password";Expression={$_.login.password}} `
  | less

$items `
  | ?{ $_.login.password -match 'chE' } `
  | Sort-Object -Property @{Expression={$_.login.password}}, `
                          @{Expression={$_.login.username}} `
  | Select-Object -Property name, `
      @{Name="Username";Expression={$_.login.username}}, `
      @{Name="Password";Expression={$_.login.password}} `
  | less


$items `
  | ?{ $_.name -match 'log' } `
  | Sort-Object -Property @{Expression={$_.login.password}}, `
                          @{Expression={$_.login.username}} `
  | Select-Object -Property name, `
      @{Name="Username";Expression={$_.login.username}}, `
      @{Name="Password";Expression={$_.login.password}} `
  | less

$items | %{ bw delete item $_.id }



