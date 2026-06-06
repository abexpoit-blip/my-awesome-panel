#!/bin/bash
echo "--- DETAILED ERROR LOGS ---"
cd /opt/nexus/deployment

echo -e "\n[FRONTEND ERROR]"
docker-compose logs frontend | tail -n 20

echo -e "\n[API ERROR]"
docker-compose logs api | tail -n 20

echo -e "\n[NGINX ERROR]"
docker-compose logs nginx | tail -n 20

echo -e "\n--- CHECKING FRONTEND FILE STRUCTURE ---"
# Create a temporary container to inspect the filesystem of the built image
docker run --rm deployment_frontend ls -R /app/.output/server || echo "Failed to find .output/server"
