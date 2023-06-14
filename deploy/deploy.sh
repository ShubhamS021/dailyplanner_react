#!/bin/bash

DEPLOY_SERVER=$DEPLOY_SERVER
DEPLOY_USER=$DEPLOY_USER
SERVER_FOLDER="dayplanner"

# Building React output
yarn install
yarn build

echo "Deploying to ${DEPLOY_SERVER}"
scp -r dist/ ${DEPLOY_USER}@${DEPLOY_SERVER}:/var/www/html/${SERVER_FOLDER}/

echo "Finished copying the build files"