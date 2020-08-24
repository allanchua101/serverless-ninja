#!/bin/bash
VALID_ENVIRONMENTS=("dev" "uat" "prod");
VALID_VERIFICATION_RESPONSES=("Y" "N" "y" "n");
APP_NAME="Serverless Ninja Buckets";

printSeparator() {
    echo -e ""
    echo -e ""
}

printColored() {
    TEXT="${1}";

    printf "\e[38;2;248;138;0m${TEXT} \e[0m\n";
}

printError() {
    TEXT="${1}";

    printf "\e[38;2;255;0;0m${TEXT}\e[0m\n";
}

printListItem() {
    TEXT="${1}";
    CHECK_MARK="\e[38;2;0;255;0m\xE2\x9C\x94\e[0m";

    echo -e "${CHECK_MARK} ${TEXT}";
}

printHeader() {
    clear;
    printColored "   _____                           __                  _   ___         _      ";
    printColored "  / ___/___  ______   _____  _____/ /__  __________   / | / (_)___    (_)___ _";
    printColored "  \__ \/ _ \/ ___/ | / / _ \/ ___/ / _ \/ ___/ ___/  /  |/ / / __ \  / / __ \`/";
    printColored " ___/ /  __/ /   | |/ /  __/ /  / /  __(__  |__  )  / /|  / / / / / / / /_/ / ";
    printColored "/____/\___/_/    |___/\___/_/  /_/\___/____/____/  /_/ |_/_/_/ /_/_/ /\__,_/  ";
    printColored "                                                                /___/         ";
}

collectEnvironment() {
  printHeader
  printSeparator;
  printColored "$APP_NAME";
  printSeparator;
  echo -n "1). Enter Environment Code (${VALID_ENVIRONMENTS[*]}): "
  read ENVIRONMENT_NAME
}

while true; do
  collectEnvironment

  if [[ " ${VALID_ENVIRONMENTS[*]} " == *" ${ENVIRONMENT_NAME} "* ]];
  then
    break
  else
    printError "Invalid environment code, try again after 1 second."
    sleep 1
    printSeparator
  fi
done
printSeparator;


collectAwsCliProfile() {
  printHeader
  printSeparator;
  printColored "$APP_NAME";
  printSeparator;
  echo -n "2). Enter AWS CLI Profile: "
  read AWS_CLI_PROFILE
}

collectAwsCliProfile;

AWS_CF_STACK_NAME="${ENVIRONMENT_NAME}-ninja-buckets-a";

verifyInstallation() {
  printHeader;
  printSeparator;
  printColored "I am about to release an instance of $APP_NAME with the following settings";
  printSeparator;
  printListItem "ENVIRONMENT_NAME = ${ENVIRONMENT_NAME}";
  printListItem "AWS_CF_STACK_NAME = ${AWS_CF_STACK_NAME}";
  printListItem "AWS_CLI_PROFILE = ${AWS_CLI_PROFILE}";
  printSeparator;
  echo -n "3). Are you sure you want to proceed? ([Y]es, [N]o): "
  read CONFIRM_CODE
}

while true; do
  verifyInstallation

  if [[ " ${VALID_VERIFICATION_RESPONSES[*]} " == *" ${CONFIRM_CODE} "* ]];
  then
    break
  else
    printError "Invalid value."
    sleep 1
    printSeparator
  fi
done

if [[ $CONFIRM_CODE == "Y" ]] || [[ $CONFIRM_CODE == "y" ]]
then
  printSeparator
  printHeader
  printSeparator
  printColored "Initiating deployment...";
  printSeparator
else
  clear;

  printHeader
  printSeparator
  printError "Stack release aborted. Press any key to exit";
  read
  clear;
fi

if aws cloudformation describe-stacks --profile "$AWS_CLI_PROFILE" --stack-name "$AWS_CF_STACK_NAME" &> /dev/null ; then
    printListItem "Updating an existing stack (${AWS_CF_STACK_NAME})";
    printSeparator
    aws cloudformation update-stack \
        --stack-name "${AWS_CF_STACK_NAME}" \
        --template-body file://rapid-expiration-bucket.cfn.yaml \
        --profile "${AWS_CLI_PROFILE}" \
        --parameters ParameterKey=Environment,ParameterValue="$ENVIRONMENT_NAME" \
        --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM CAPABILITY_NAMED_IAM
else
    printListItem "Creating a new stack (${AWS_CF_STACK_NAME})";
    printSeparator
    aws cloudformation create-stack \
        --stack-name "${AWS_CF_STACK_NAME}" \
        --template-body file://rapid-expiration-bucket.cfn.yaml \
        --profile "${AWS_CLI_PROFILE}" \
        --parameters ParameterKey=Environment,ParameterValue="$ENVIRONMENT_NAME" \
        --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM CAPABILITY_NAMED_IAM
fi

printSeparator;
echo -n "Deployment completed";
printSeparator;
read -n 1 -s -r -p "Press any key to continue....";
clear;
