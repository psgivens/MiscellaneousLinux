#!/bin/bash



shouldExit=0 

#export AWS_DEFAULT_PROFILE='pp-psg'

aws_profile=$(aws configure get profile)
if [ -z $aws_profile ]; then
  echo "Set credentials with:"
  echo "    export AWS_DEFAULT_PROFILE=<Profile_name>"
  shouldExit=1
fi


if [ $shouldExit == 1 ]; then
  echo "Should Exit"
fi

aws configure list

cfn_template="https://aws-quickstart.s3.amazonaws.com/saas-identity-cognito/templates/saas-identity-cognito-master.template"

# Execute this to test
# Test-CFNTemplate -TemplateURL $cfn_template 

params=$(cat ./parameters.json)

cfnarn=$(aws cloudformation create-stack \
  --template-url $cfn_template \
  --capabilities 'CAPABILITY_NAMED_IAM' \
  --stack-name 'SaaS-identity-with-Cognito' \
  --parameters file://./parameters.json )

$cfnarn | Tee-Object -FilePath 'cfn.arn'

sleep -s 10

. ./status.sh



 
