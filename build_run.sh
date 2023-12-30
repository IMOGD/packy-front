#!/bin/sh

TARGET_CONTAINER=$1
TARGET_IMAGE="${TARGET_CONTAINER}:latest"

docker build -t $TARGET_IMAGE .
docker run -d -p 17001:80 --name $TARGET_CONTAINER