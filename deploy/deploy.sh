#!/bin/bash

# Environment variables
DEPLOY_SERVER=$DEPLOY_SERVER
DEPLOY_USER=$DEPLOY_USER


if [[ "$CI_ENVIRONMENT_NAME" == "qa" ]]; then
  SERVER_FOLDER="httpdocs/apps-qa/plannerapp"
elif [[ "$CI_ENVIRONMENT_NAME" == "prod" ]]; then
  SERVER_FOLDER="httpdocs/apps/plannerapp"
else
  echo "Invalid environment name: $CI_ENVIRONMENT_NAME"
  exit 1
fi

yarn install
yarn build

echo "Deploying to $DEPLOY_SERVER - environment: $$CI_ENVIRONMENT_NAME"
scp -r dist/* ${DEPLOY_USER}@${DEPLOY_SERVER}:${SERVER_FOLDER}/
scp -r .env ${DEPLOY_USER}@${DEPLOY_SERVER}:${SERVER_FOLDER}/
echo "Finished copying the build files"


