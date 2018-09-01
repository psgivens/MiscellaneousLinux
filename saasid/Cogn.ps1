

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






#####################################
# User Pools
###############################
$userpools = Get-CGIPUserPoolList 

$userpoolids = Get-CGIPUserPoolList `
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

# Notice that the tenant_ids are the same as the user-pool-names
$users | %{
  $_.Attributes  | ?{ $_.Name -match 'custom:tenant_id' }
}




#####################################
# Users from User Pools in my tenant
###############################

# Pick a tenant
$tenant_id = 'TENANT643f6bde9fce482fa24e93141c76050a'

# Which users are part of that tenant? 
$mytenantusers = $users | ?{ 
  $_.Attributes  | ?{ $_.Name -match 'custom:tenant_id' -and $_.Value -match $tenant_id }
  #$_.Attributes.GetType()
  #$_.Attributes | %{ $_.Name, $_.Name.length, ('-' + $_.Name + '-'), $_.Value }
}
$mytenantusers

# Json isn't so nice for cognito attributes
$mytenantusers | ConvertTo-json

# What are the roles for this tenant
$mytenantusers | %{
  $_.Attributes  | ?{ $_.Name -match 'custom:role' }
}

# Who are my admins for this tenant? 
$mytenantusers | ?{
  $_.Attributes  | ?{ $_.Name -match 'custom:role' -and $_.Value -match 'TenantAdmin' }
}

# Who are my users for this tenant? 
$mytenantusers | %{
  $_.Attributes  | ?{ $_.Name -match 'custom:role' -and $_.Value -match 'TenantUser' }
}





#####################################
# Identity Pools (id/name pairs)
###############################

$identitypoollist = Get-CGIIdentityPoolList 
$identitypoolids = $identitypoollist | %{ $_.IdentityPoolId }
$identitypoollist

# Notice that the identity-pool-identitypoolnames are also the same as the user-pool-names
$identitypoollist | %{ $_.IdentityPoolName }


$tenantpoolid = $identitypoollist `
  | ?{ $_.IdentityPoolName -match $tenant_id } `
  | %{ $_.IdentityPoolId }
$tenantpoolid



#####################################
# Identity Pool Roles
###############################

$identitypoolroles = $identitypoolids | Get-CGIIdentityPoolRole 

# Notice that the identity-pool-roles-identitypoolid 
# matches the identity-pool-identitypoolnames 
$identitypoolroles | %{ $_.IdentityPoolId }

$identitypoolroles | Format-List


# There are two 'RoleArn's for each IdentityPoolRole
$identitypoolroles | %{ 
  $_.RoleMappings.Values.RulesConfiguration.Rules.RoleArn 
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

$identitypools 

# Every identity-pool has an identity-provider
# I don't know what these do.
$identitypools | %{ $_.CognitoIdentityProviders } 






#####################################
# IAM Roles
###############################

# Get ALL IAM roles. Cannot ask by ARN.
$iamroles = Get-IAMRoleList 
#$iamroles | Format-List

$tenantiamroles = $iamroles | ?{ $_.Arn -in $tenantpoolrolearns }

$tenantiamroles | Format-List



# What are these? 
$tenantiamroles `
  | %{ [System.Web.HttpUtility]::UrlDecode($_.AssumeRolePolicyDocument) } `
  | jq '.'

$tenantiamroles `
  | %{ [System.Web.HttpUtility]::UrlDecode($_.AssumeRolePolicyDocument) } `
  | ConvertFrom-Json 






#####################################
# HOW DO I? Map the roles to policies? 
###############################









#####################################
# IAM policies
###############################

# Get ALL policies
$policies = Get-IAMPolicyList 
$policies


# Filter policies by name
$tenantpolicies = $policies `
  | ?{ $_.PolicyName -match 'SYSADMIN' -or $_.PolicyName -match 'TENANT' }

$tenantpolicies 

# Get the actual policies (via policy version)
$tenantpolicies `
  | Select -Skip 4 -First 1 `
  | %{ (Get-IAMPolicyVersion -PolicyArn $_.Arn -VersionId $_.DefaultVersionId) } `
  | %{ [System.Web.HttpUtility]::UrlDecode($_.Document) } `
  | jq '.' `
  | less

# Get the actual policies (via policy version)
$tenantpolicies `
  | Select -Skip 4 -First 1 `
  | %{ (Get-IAMPolicyVersion -PolicyArn $_.Arn -VersionId $_.DefaultVersionId) } `
  | %{ [System.Web.HttpUtility]::UrlDecode($_.Document) } `
  | ConvertFrom-Json `
  | %{ $_.Statement.Condition.'ForAllValues:StringEquals'.'dynamodb:LeadingKeys' }


$tenantpolicies | less



 

