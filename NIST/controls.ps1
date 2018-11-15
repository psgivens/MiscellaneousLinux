#!/usr/bin/pwsh-preview

# Get the controls form NIST  
$controls = Select-Xml -Path ./800-53-controls.xml -XPath /

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



$file = "nist80053.md"
rm $file
$controls.Node.controls.control |%{
  "## {0}: {1}`n" -f $_.number, $_.title >> $file
  $_.'supplemental-guidance'.description >> $file
  #$file = ("{0}.txt" -f $control.number)
  $_.statement | %{ 
    "### {0}`n" -f $_.description >> $file
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
remarkable $file &

remarkable $file &


$controls.Node.controls.control[2]

$controls.Node.controls.control[2].'supplemental-guidance'.description

$controls.Node.controls.control[2].statement

$controls.Node.controls.control[2].statement.statement





$controls.Node.controls.control `
  | Select -ExpandProperty family `
  | Get-Unique `
  | Measure






