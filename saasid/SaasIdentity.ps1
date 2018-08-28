
# Import the AWS modules
Import-Module AWSPowerShell.NetCore

# Set the credentials from your account
Set-AWSCredentials 
  -AccessKey '<accesskey>' `
  -SecretKey '<secretkey>' `
  -StoreAs 'profile_name'

# Set to the current profile
Set-AWSCredentials -ProfileName "pp-psg"

# Should print the same profile name as above.
Write-Host "Current profile is: $StoredAWSCredentials"

# Set the default region
Set-DefaultAWSRegion -Region "us-east-2"

# Create a keypair and assign it to a variable. 
$pair = New-EC2KeyPair -KeyName SaasIdentities

# Move to the ~/.keys directory and write the pem file
pushd ~/.keys
$pair.KeyMaterial >> SaasIdentities.pem
chmod 400 SaasIdentities.pem

popd 

$pair.KeyFingerPrint >> SaasIdentities.finger


$cfn_template = "https://aws-quickstart.s3.amazonaws.com/saas-identity-cognito/templates/saas-identity-cognito-master.template"

Test-CFNTemplate -TemplateURL $cfn_template 

# Let's take a look at the template
Test-CFNTemplate -TemplateURL $cfn_template `
  | %{ $_.Parameters } `
  | Select -Property ParameterKey, DefaultValue, Description

Test-CFNTemplate -TemplateURL $cfn_template | Select -ExpandProperty Description

$params = cat ./parameters.json | ConvertFrom-Json
$params
#
$cfnarn = New-CFNStack `
  -TemplateUrl $cfn_template `
  -Capability 'CAPABILITY_NAMED_IAM' `
  -Stackname 'SaaS-identity-with-Cognito' `
  -Parameter $params
$cfnarn | Tee-Object -FilePath 'cfn.arn'


# arn created during this process.




 
