#!/bin/sh

TARGET_CONTAINER=$1
TARGET_IMAGE="$TARGET_CONTAINER:latest"

echo $TARGET_CONTAINER

docker build -t $TARGET_IMAGE .

set +
docker kill $TARGET_CONTAINER
docker rm $TARGET_CONTAINER
docker run -d -p 17001:80 --name $TARGET_CONTAINER $TARGET_IMAGE

set -