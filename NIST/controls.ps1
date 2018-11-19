#!/usr/bin/pwsh-preview


$file = "nist80053.md"

Function Out-NistMarkdown {
  param(
    [Parameter(Mandatory=$true,ValueFromPipeline=$true)]
    $Controls,
    [Parameter(Mandatory=$true)]
    $File,
    [Parameter(Mandatory=$false)]
    [switch]$JIRA
  )
  Process {
    if ($JIRA){
      $Controls | %{
        "`n`n----" >> $file
        "`n`nh2. *{0}*: {1}`n" -f $_.number, $_.title >> $file
        $_.'supplemental-guidance'.description >> $file
        #$file = ("{0}.txt" -f $control.number)
        $_.statement | %{ 
          "`n`nh3. {0}`n" -f $_.description >> $file
          if ($_.statement) { $_.statement | %{  
              "* *{0}*: {1}" -f $_.number, $_.description >> $file
              if ($_.statement) {
                $_.statement | %{ "** *{0}*: {1}" -f $_.number, $_.description } >> $file
              }
            }
          }
        }
      }
    } else {
      $Controls | %{
        "`n## {0}: {1}`n" -f $_.number, $_.title >> $file
        $_.'supplemental-guidance'.description >> $file
        #$file = ("{0}.txt" -f $control.number)
        $_.statement | %{ 
          "`n### {0}`n" -f $_.description >> $file
          if ($_.statement) { $_.statement | %{  
              "* {0}: {1}" -f $_.number, $_.description >> $file
              if ($_.statement) {
                $_.statement | %{ "* * {0}: {1}" -f $_.number, $_.description } >> $file
              }
            }
          }
          echo "" >> $file
        }
      }
    }
  }
}
clear
Write-Host "Created: Out-NistMarkdown"

# Get the controls form NIST  
$controls = Select-Xml -Path ./800-53-controls.xml -XPath /

$file = "nist80-53.md"
$controls.Node.controls.control `
  | Out-NistMarkdown -File $file
remarkable $file &


$file = "AWS_AccesControl.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "AC-1" 
      "AC-2" 
      "AC-3" 
      "AC-4" 
      "AC-6" 
      "AC-7" 
      "AC-8" 
      "AC-11" 
      "AC-12" 
      "AC-14" 
      "AC-16" 
      "AC-17"
      "AC-18"
      "AC-19"
      "AC-20"
      "AC-21"
      "AC-22"
      "AC-23"
      "AC-24"
      "AC-25"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file


$file = "MediaProtection.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "MP-1"
      "MP-2"
      "MP-3"
      "MP-4"
      "MP-5"
      "MP-6"
      "MP-7"
      "MP-8"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file



$file = "IncidentReporting.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "IR-1"
      "IR-2"
      "IR-3"
      "IR-4"
      "IR-5"
      "IR-6"
      "IR-7"
      "IR-8"
      "IR-9"
      "IR-10"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file

$file = "IdentificationAndAuthentication.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "IA-1"
      "IA-2"
      "IA-3"
      "IA-4"
      "IA-5"
      "IA-6"
      "IA-7"
      "IA-8"
      "IA-9"
      "IA-10"
      "IA-11"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file



$file = "ContingencyPLanning.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "CP-1"
      "CP-2"
      "CP-3"
      "CP-4"
      "CP-5"
      "CP-6"
      "CP-7"
      "CP-8"
      "CP-9"
      "CP-10"
      "CP-11"
      "CP-12"
      "CP-13"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file


$file = "SecurityAssessment.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "CA-1"
      "CA-2"
      "CA-3"
      "CA-4"
      "CA-5"
      "CA-6"
      "CA-7"
      "CA-8"
      "CA-9"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file


$file = "AuditAndAccountability.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "AU-1"
      "AU-2"
      "AU-3"
      "AU-4"
      "AU-5"
      "AU-6"
      "AU-7"
      "AU-8"
      "AU-9"
      "AU-10"
      "AU-11"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file

$file = "AwarenessAndTraining.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "AT-1"
      "AT-2"
      "AT-3"
      "AT-4"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file

$file = "Maintenance.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "MA-1"
      "MA-2"
      "MA-3"
      "MA-4"
      "MA-5"
      "MA-6"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file

$file = "PhysicalAndEnvironmentalProtection.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "PE-1"  
      "PE-2"
      "PE-3"
      "PE-4"
      "PE-5"
      "PE-6"
      "PE-8"
      "PE-9"
      "PE-10"
      "PE-11"
      "PE-12"
      "PE-13"
      "PE-14"
      "PE-15"
      "PE-16"
      "PE-17"
      "PE-18"
      "PE-19"
      "PE-20"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file


$file = "Planning.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "PL-1"
      "PL-2"
      "PL-4"
      "PL-7"
      "PL-8"
      "PL-9"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file


$file = "RiskAssessment.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "RA-1"
      "RA-2"
      "RA-3"
      "RA-5"
      "RA-6"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file



$file = "SystemAndCommunicationProtection.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "SA-1"
      "SA-2"
      "SA-3"
      "SA-4"
      "SA-5"
      "SA-8"
      "SA-9"
      "SA-10"
      "SA-11"
      "SA-12"
      "SA-13"
      "SA-14"
      "SA-15"
      "SA-16"
      "SA-17"
      "SA-18"
      "SA-19"
      "SA-20"
      "SA-21"
      "SA-22"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file


$file = "SystemAndInformationIntegrety.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "SI-1"
      "SI-2"
      "SI-3"
      "SI-4"
      "SI-5"
      "SI-6"
      "SI-7"
      "SI-8"
      "SI-10"
      "SI-11"
      "SI-12"
      "SI-13"
      "SI-14"
      "SI-15"
      "SI-16"
      "SI-17"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file


$file = "ProgramManagement.md"
rm $file
$controls.Node.controls.control `
  | ?{ 
    $_.number -in @( 
      "PM-1"
      "PM-2"
      "PM-3"
      "PM-4"
      "PM-5"
      "PM-6"
      "PM-7"
      "PM-8"
      "PM-9"
      "PM-10"
      "PM-11"
      "PM-12"
      "PM-13"
      "PM-14"
      "PM-15"
      "PM-16"
      )
  } | Out-NistMarkdown -JIRA -File $file
gedit $file
























# Show the controls
$controls.Node.controls.control

# What does 'supplemental-guidance' mean? 
$controls.Node.controls.control.'supplemental-guidance' | gm -MemberType Property

# Pick an arbitratry control
$control = $controls.Node.controls.control | Select -Skip 134 -First 1

$control

$control.'supplemental-guidance'.description

$control.statement.description

$control.statement
$control.statement.statement
$control.statement.statement.statement 

$control.statement | gm -MemberType Property

$control.statement.statement | gm -MemberType Property

$control.statement.statement.statement | gm -MemberType Property

| %{ "{0}: {1} -f $_.number, $_.description }

clear
$file = ("{0}.txt" -f $control.number)
$control.statement | %{ "{0}: {1}" -f $control.number, $_.description } > $file
$control.statement.statement | %{ "{0}: {1}" -f $_.number, $_.description } >> $file
$control.statement.statement.statement | %{ "{0}: {1}" -f $_.number, $_.description } >> $file
echo ""
clear
cat $file

$controls.Node.controls.control 

$controls.Node.controls.control |%{
  $control = $_
  $file = ("{0}.txt" -f $control.number)
  $control.statement | %{ "{0}: {1}" -f $control.number, $_.description } > $file
  $control.statement.statement | %{ "{0}: {1}" -f $_.number, $_.description } >> $file
  $control.statement.statement.statement | %{ "{0}: {1}" -f $_.number, $_.description } >> $file
  echo ""
  #cat $file
}

less $file

cat *.txt | less


$controls.Node.controls.control `
  | Select -Property family, number, title `
  | Export-Csv nist80053.csv



remarkable $file &


$controls.Node.controls.control[2]

$controls.Node.controls.control[2].'supplemental-guidance'.description

$controls.Node.controls.control[2].statement

$controls.Node.controls.control[2].statement.statement





$controls.Node.controls.control `
  | Select -ExpandProperty family `
  | Get-Unique `
  | Measure






