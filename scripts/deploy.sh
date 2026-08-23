#!/bin/bash

set -e

PROJECT_DIR="$HOME/containers/front/animal_adoption_api_web"

echo "================================="
echo "🚀 Deploy AnimalAdoptionWeb"
echo "================================="

echo "🔐 Preparando certificados..."

mkdir -p ./certs

cp "$PROJECT_DIR/certs/app.animal-adoption.com.br.pem" ./certs/
cp "$PROJECT_DIR/certs/app.animal-adoption.com.br-key.pem" ./certs/

echo "🐳 Build e restart..."

docker compose up -d --build

echo "📦 Container:"

docker ps --filter "name=adoption-animal-app"

echo "================================="
echo "✅ Deploy concluído!"
echo "================================="