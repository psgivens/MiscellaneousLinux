


function Select-Property {
  [CmdletBinding()]
  param (
    [parameter(Mandatory=$true, ValueFromPipeline=$true)]
    [object[]]$InputObjects,

    [parameter(Mandatory=$true, Position=0)]
    $PropertyName
  )

  
  Process {
    $InputObjects | Select-Object -ExpandProperty $PropertyName
  }
}
Set-Alias slp Select-Property


function Get-HistoryItem {
  [CmdletBinding()]
  param (
    [parameter(Mandatory=$true, Position=0)]
    $Id
  )

  
  Process {
    Get-History -Id $Id | Select-Property -Property CommandLine
  }
}
Set-Alias ghi Get-HistoryItem

Export-ModuleMember -Function Select-Property
Export-ModuleMember -Alias slp
Export-ModuleMember -Function Get-HistoryItem
Export-ModuleMember -Alias ghi

