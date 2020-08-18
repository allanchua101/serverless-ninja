#!/bin/bash
VALID_ENVIRONMENTS=("dev" "uat" "prod");
VALID_VERIFICATION_RESPONSES=("Y" "N" "y" "n");
APP_NAME="Serverless Ninja Factions";

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

collectArtifactStore() {
  printHeader
  printSeparator;
  printColored "$APP_NAME";
  printSeparator;
  echo "=============================NOTE==========================";
  echo "In order to upload SAM builds, you will need a ";
  echo "staging S3 Bucket."
  printSeparator
  echo "Check Information @ https://amzn.to/2CBUWzc"
  echo "=============================NOTE==========================";
  printSeparator;
  echo -n "2). Artifact S3 Bucket: "
  read ARTIFACT_STORE
}

collectArtifactStore

collectAwsCliProfile() {
  printHeader
  printSeparator;
  printColored "$APP_NAME";
  printSeparator;
  echo -n "3). Enter AWS CLI Profile: "
  read AWS_CLI_PROFILE
}

collectAwsCliProfile;

ARTIFACT_PATH="${ENVIRONMENT_NAME}-ninja-factions-apis";
AWS_CF_STACK_NAME="${ENVIRONMENT_NAME}-ninja-factions-apis";

verifyInstallation() {
  printHeader;
  printSeparator;
  printColored "I am about to release an instance of $APP_NAME with the following settings";
  printSeparator;
  printListItem "ENVIRONMENT_NAME = ${ENVIRONMENT_NAME}";
  printListItem "AWS_CF_STACK_NAME = ${AWS_CF_STACK_NAME}";
  printListItem "ARTIFACT_PATH = ${ARTIFACT_PATH}";
  printListItem "ARTIFACT_STORE = ${ARTIFACT_STORE}";
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

# For windows users 
UNAME=$(uname);

if [[ "$UNAME" == CYGWIN* || "$UNAME" == MINGW* ]] ; then
  echo "Windows machine detected..."
  alias sam='sam.cmd'
fi

# Package APIs code.
# translate SAM template to plain CloudFormation.
sam package --template-file apis.sam.yaml \
  --s3-bucket "${ARTIFACT_STORE}" \
  --s3-prefix "${ARTIFACT_PATH}" \
  --output-template-file ./apis.cfn.yaml \
  --profile "${AWS_CLI_PROFILE}";

# Deploy packaged code.
sam deploy --template-file ./apis.cfn.yaml \
  --s3-bucket "${ARTIFACT_STORE}" \
  --s3-prefix "${ARTIFACT_PATH}" \
  --stack-name $AWS_CF_STACK_NAME \
  --parameter-overrides ParameterKey=Environment,ParameterValue=$ENVIRONMENT_NAME \
  --capabilities CAPABILITY_IAM \
  --profile "${AWS_CLI_PROFILE}"

# Say congrats, offer beer and goodbye :)
printSeparator;
echo -n "Deployment complete! 🍺 🍺 🍺";
printSeparator;
read -n 1 -s -r -p "Press any key to continue....";
clear;