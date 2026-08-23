#!/bin/bash

set -e

PROJECT_DIR="$HOME/containers/front/animal_adoption_api_web"

cd "$PROJECT_DIR"

echo "================================="
echo "🚀 Deploy AnimalAdoptionWeb"
echo "================================="

docker compose up -d --build

echo "📦 Container:"
docker ps --filter "name=adoption-animal-app"

echo "================================="
echo "✅ Deploy concluído!"
echo "================================="