

# Import the AWS modules
Import-Module AWSPowerShell.NetCore

# Useful AWS discovery cmdlet 
Get-AWSCmdletName -Service Cognito -MatchWithRegex "describe"

Get-AWSCmdletName -Service IAM  -MatchWithRegex "policy"

Get-AWSCmdletName -Service IAM  -MatchWithRegex "policies"

Get-AWSCmdletName -Service IAM

Get-AWSCmdletName -Service Cognito -MatchWithRegex "policies"

# Set to the current profile
Set-AWSCredentials -ProfileName "pp-psg"

# Should print the same profile name as above.
Write-Host "Current profile is: $StoredAWSCredentials"

# Set the default region
Set-DefaultAWSRegion -Region "us-east-2"


Function Write-Json {
  param(
    [Parameter(Position=1,Mandatory=$true,ValueFromPipeline=$true)]
    $Values,
    [Parameter(Position=2,Mandatory=$true)]
    $Name
  )
  Begin{
    $v = @()
  }
  Process{
    $v += $values
  }
  End{
    if ($v) {
      $v | ConvertTo-Json | Tee-Object -FilePath "artifacts/$name.json" 
    }
  }
}


#####################################
# User Pools
###############################
$userpools = Get-CGIPUserPoolList 

$userpools | Write-Json -Name userpools

$userpools = cat artifacts/userpools.json | ConvertFrom-Json 
$userpools


$userpoolids = $userpools `
  | %{ $_.id }

$userpools | %{ $_.Name }


#####################################
# Not using Cognito User-Pool-Groups or User-Pool-Identity-Providers
###############################
$userpoolids | Get-CGIPGroupList

$userpoolids | Get-CGIPIdentityProviderList



#####################################
# Users from User Pools
###############################
$users = $userpoolids | Get-CGIPUserList 

$users | Write-Json -Name users
$users | Export-Clixml -Path artifacts/users.xml

$users = Import-Clixml artifacts/users.xml
$users

# Notice that the tenant_ids are the same as the user-pool-names
$tenants = $users | %{
  $_.Attributes  | ?{ $_.Name -match 'custom:tenant_id' } | %{ $_.Value }
}
$tenants

#####################################
# Users from User Pools in my tenant
###############################

# Pick a tenant
$tenant_id = $tenants[3]
$tenant_id

$tenant_id > artifacts/tenant_id.txt

$tenant_id = cat artifacts/tenant_id.txt
$tenant_id

# Which users are part of that tenant? 
$mytenantusers = $users | ?{ 
  $_.Attributes  | ?{ $_.Name -match 'custom:tenant_id' -and $_.Value -match $tenant_id }
  #$_.Attributes.GetType()
  #$_.Attributes | %{ $_.Name, $_.Name.length, ('-' + $_.Name + '-'), $_.Value }
}
$mytenantusers

#$mytenantusers | Write-Json -Name 'tenantusers'
#$mytenantusers | Export-Clixml -Path artifacts/tenantusers.xml

# Json isn't so nice for cognito attributes
$mytenantusers | ConvertTo-json

# What are the roles for this tenant
$mytenantusers | %{
  $_.Attributes  | ?{ $_.Name -match 'custom:role' } | %{ $_.Value }
}

# Who are my admins for this tenant? 
$mytenantusers | ?{
  $_.Attributes  | ?{ $_.Name -match 'custom:role' -and $_.Value -match 'TenantAdmin' }
}

# Who are my users for this tenant? 
$mytenantusers | ?{
  $_.Attributes  | ?{ $_.Name -match 'custom:role' -and $_.Value -match 'TenantUser' }
}





#####################################
# Identity Pools (id/name pairs)
###############################

$identitypoollist = Get-CGIIdentityPoolList 
$identitypoollist

$identitypoollist | Write-Json -Name identitypoollist

$identitypoollist = cat artifacts/identitypoollist.json | ConvertFrom-Json
$identitypoollist

$identitypoolids = $identitypoollist | %{ $_.IdentityPoolId }
$identitypoolids 

# Notice that the identity-pool-identitypoolnames are also the same as the user-pool-names
$identitypoollist | %{ $_.IdentityPoolName }


$tenantpoolid = $identitypoollist `
  | ?{ $_.IdentityPoolName -match $tenant_id } `
  | %{ $_.IdentityPoolId }
$tenantpoolid

$tenantpoolid > artifacts/tenantpoolid.txt

$tenantpoolid = cat artifacts/tenantpoolid.txt



#####################################
# Identity Pool Roles
###############################

$identitypoolroles = $identitypoolids | Get-CGIIdentityPoolRole 
$identitypoolroles

$identitypoolroles.RoleMappings.Values.RulesConfiguration.Rules | Write-Json -Name identitypoolrolerules

$identitypoolrolesrules = cat artifacts/identitypoolrolerules.json | ConvertFrom-Json

$identitypoolrolerules = cat artifacts/identitypoolrolerules.json | ConvertFrom-Json
$identitypoolrolerules 


# AWS Rules do not serialize. It is a bug. 
$identitypoolroles | Write-Json -Name identitypoolroles
$identitypoolroles | Export-Clixml -Path artifacts/identitypoolroles.xml

$identitypoolroles = cat artifacts/identitypoolroles.json | ConvertFrom-Json
$identitypoolroles = Import-Clixml -Path artifacts/identitypoolroles.xml
$identitypoolroles



# Notice that the identity-pool-roles-identitypoolid 
# matches the identity-pool-identitypoolnames 
$identitypoolroles | %{ $_.IdentityPoolId }

$identitypoolroles | Format-List


# There are two 'RoleArn's for each IdentityPoolRole
$identitypoolrolerules 


$identitypoolrolerules | %{ 
  $_.RoleArn 
}

# Each identity pool has two 'rules' which match roles to IAM roles
$identitypoolroles | %{ 
  $_.IdentityPoolId
  $_.Roles
  $_.RoleMappings.Values.RulesConfiguration.Rules
} | Format-List



#####################################
# Identity Pool Roles (just my tenant)
###############################

$tenantpoolroles = $identitypoolroles | ?{ $_.IdentityPoolId -eq $tenantpoolid }
$tenantpoolroles

# Each identity pool has two 'rules' which match roles to IAM roles
$tenantpoolroles | %{ 
  $_.IdentityPoolId
  $_.Roles
  $_.RoleMappings.Values.RulesConfiguration.Rules
} | Format-List

$tenantpoolrolearns = $tenantpoolroles | %{ 
  $_.RoleMappings.Values.RulesConfiguration.Rules.RoleArn }
$tenantpoolrolearns 




#####################################
# Revisiting Identity Pools (digging deeper)
###############################

# Let's take a look at the Identity Pools 
$identitypools = $identitypoolids | Get-CGIIdentityPool

if ($identitypools) {
  $identitypools | Export-Clixml -Path artifacts/identitypools.xml
}

$identitypools = Import-Clixml -Path artifacts/identitypools.xml

# Every identity-pool has an identity-provider
# I don't know what these do.
$identitypools | %{ $_.CognitoIdentityProviders } 






#####################################
# IAM Roles
###############################

# Get ALL IAM roles. Cannot ask by ARN.
$iamroles = Get-IAMRoleList 
#$iamroles | Format-List

$iamroles | Export-Clixml -Path artifacts/iamroles.xml

$iamroles = Import-Clixml -Path artifacts/iamroles.xml

$tenantiamroles = $iamroles | ?{ $_.Arn -in $tenantpoolrolearns }

$tenantiamroles | Format-List

# TODO: Recreate
$tenantiamroles | Write-Json -Name tenantiamroles

$tenantiamroles = cat artifacts/tenantiamroles.json | ConvertFrom-Json

$tenantiamroles | Export-Clixml -Path artifacts/tenantiamroles.xml

$tenantiamroles | Import-Clixml -Path artifacts/tenantiamroles.xml
$tenantiamroles




# What are these? 
$tenantiamroles `
  | %{ [System.Web.HttpUtility]::UrlDecode($_.AssumeRolePolicyDocument) } `
  | jq '.'

$tenantiamroles `
  | %{ [System.Web.HttpUtility]::UrlDecode($_.AssumeRolePolicyDocument) } `
  | ConvertFrom-Json 

$tenantiamroles `
  | %{ [System.Web.HttpUtility]::UrlDecode($_.AssumeRolePolicyDocument) } `
  | jq '.' > artifacts/tenantiamroles.json





#####################################
# HOW DO I? Map the roles to policies? 
###############################









#####################################
# IAM policies
###############################

# Get ALL policies
$policies = Get-IAMPolicyList 
$policies

$policies | Export-Clixml -Path artifacts/iampolicylist.xml
$policies = Import-Clixml -Path artifacts/iampolicylist.xml

# Filter policies by name
$tenantpolicies = $policies `
  | ?{ $_.PolicyName -match 'SYSADMIN' -or $_.PolicyName -match 'TENANT' }

$tenantpolicies 
$tenantpolicies | Measure | %{ $_.Count }

# Get the actual policies (via policy version)
$tenantpolicies `
  | Select -Skip 4 -First 1 `
  | %{ (Get-IAMPolicyVersion -PolicyArn $_.Arn -VersionId $_.DefaultVersionId) } `
  | %{ [System.Web.HttpUtility]::UrlDecode($_.Document) } `
  | jq '.' > tenantpolicies.json

# Get the actual policies (via policy version)
$tenantpolicies `
  | Select -Skip 4 -First 1 `
  | %{ (Get-IAMPolicyVersion -PolicyArn $_.Arn -VersionId $_.DefaultVersionId) } `
  | %{ [System.Web.HttpUtility]::UrlDecode($_.Document) } `
  | ConvertFrom-Json `
  | %{ $_.Statement.Condition.'ForAllValues:StringEquals'.'dynamodb:LeadingKeys' } `
  > artifacts/tenantpolicyversion.txt


$tenantpolicies | less



 

