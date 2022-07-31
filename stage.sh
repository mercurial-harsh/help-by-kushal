#!/usr/bin/bash

echo "\nBuilding contnainer\n"
docker build --no-cache -t staging .
sleep 15;
echo "\nMaking the build directory"
docker run --mount type=bind,source="$(pwd)",target=/app staging sh -c "npm run build"
