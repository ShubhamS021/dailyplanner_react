#!/bin/bash

# Environment variables
environment_name=$ENVIRONMENT_NAME
DEPLOY_SERVER=$DEPLOY_SERVER
DEPLOY_USER=$DEPLOY_USER

# .env contents
VITE_SUPABASE_URL=$VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
VITE_PUBLIC_SITE_URL=$CI_ENVIRONMENT_URL

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

ENV_FILE=dist/.env
touch $ENV_FILE
echo "$VITE_SUPABASE_URL" > "$ENV_FILE"
echo "$VITE_SUPABASE_ANON_KEY" > "$ENV_FILE"
echo "$VITE_PUBLIC_SITE_URL" > "$ENV_FILE"

echo "Deploying to ${DEPLOY_SERVER} - environment: ${environment_name}"
scp -r dist/* ${DEPLOY_USER}@${DEPLOY_SERVER}:${SERVER_FOLDER}/
echo "Finished copying the build files"


