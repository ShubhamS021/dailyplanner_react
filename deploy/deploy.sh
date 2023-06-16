#!/bin/bash

environment_name=$ENVIRONMENT_NAME
DEPLOY_SERVER=$DEPLOY_SERVER
DEPLOY_USER=$DEPLOY_USER

if [[ "$environment_name" == "qa" ]]; then
  SERVER_FOLDER="httpdocs/apps-qa/plannerapp"
elif [[ "$environment_name" == "prod" ]]; then
  SERVER_FOLDER="httpdocs/apps/plannerapp"
else
  echo "Invalid environment name: $environment_name"
  exit 1
fi

yarn install
yarn build

echo "Deploying to ${DEPLOY_SERVER} - environment: ${environment_name}"
scp -r dist/* ${DEPLOY_USER}@${DEPLOY_SERVER}:${SERVER_FOLDER}/

echo "Finished copying the build files"