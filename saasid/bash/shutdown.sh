


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

$cfnarn = cat ./cfn.arn  

aws cloudformation delete-stack --stack-name 'SaaS-identity-with-Cognito'

shouldContinue=1
while [ $shouldContinue ]
do
  sleep 10
  clear
  echo "Getting CFN Stack"
  date
  stack=$(aws cloudformation describe-stacks --stack-name 'SaaS-identity-with-Cognito')
  status=$( echo $stack | jq ".Stacks[0].StackStatus" | tr -d '"')
  if [ "$status" = "DELETE_IN_PROGRESS" ]; then s=1; else s=0; fi
  shouldContinue=$s
  echo $stack | jq "."
done


