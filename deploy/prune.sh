#!/bin/bash

ssh ${DEPLOY_USER}@${DEPLOY_SERVER}

ssh ${DEPLOY_SERVER} "docker system prune -af" 