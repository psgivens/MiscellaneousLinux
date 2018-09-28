#!/bin/bash


shouldExit=0 

aws_profile=$(aws configure get profile)
if [ -z $aws_profile ]; then
  echo "Set credentials with:"
  echo "    aws configure set profile <profile_name>"
  shouldExit=0
fi


if [ $shouldExit == 1 ]; then
  echo "Should Exit"
fi

aws configure list

cfnarn='arn:aws:cloudformation:us-east-1:123456789012:stack/myteststack/466df9e0-0dff-08e3-8e2f-5088487c4896'

cfnarn=$(cat ./cfnarn.txt |jq ".StackId" | tr -d '"')

$stack=$null

shouldContinue=1
while [ $shouldContinue ]
do
  clear
  echo "Getting CFN Stack"
  date
  stack=$(aws cloudformation describe-stacks --stack-name 'SaaS-identity-with-Cognito')
  status=$( echo $stack | jq ".Stacks[0].StackStatus" | tr -d '"')
  if [ "$status" = "CREATE_IN_PROGRESS" ]; then s=1; else s=0; fi
  shouldContinue=$s
  echo $stack | jq "."
  sleep 10
done




 
