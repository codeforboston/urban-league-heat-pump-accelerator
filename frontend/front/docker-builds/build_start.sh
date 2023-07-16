#!/bin/bash

echo Running npm build to generate new production version. Please allow a few minutes.
cd ..
npm run build

echo Generating a docker container
cd build

cp ../docker-builds/Dockerfile ./Dockerfile
docker build . -t front-prod-docker


echo Running new docker container called 'front-prod-docker'
docker run -p 3001:80 front-prod-docker
