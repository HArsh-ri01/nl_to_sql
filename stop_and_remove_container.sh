#!/bin/bash

# Container names
CONTAINERS=("jivraj18/nl_to_sql_backend" "jivraj18/nl_to_sql_frontend")

for CONTAINER in "${CONTAINERS[@]}"; do
    # Get container ID by image name
    CONTAINER_ID=$(docker ps -a -q --filter ancestor=$CONTAINER)

    if [ -n "$CONTAINER_ID" ]; then
        echo "Stopping container from image: $CONTAINER"
        docker stop $CONTAINER_ID

        echo "Removing container from image: $CONTAINER"
        docker rm $CONTAINER_ID
    else
        echo "No container found for image: $CONTAINER"
    fi
done
