#!/bin/bash

set -e

echo "================================="
echo "🚀 Deploy AnimalAdoptionWeb"
echo "================================="

echo "🐳 Rebuild e restart..."

docker compose up -d --build

echo "✅ Deploy concluído!"

docker ps --filter "name=adoption-animal-app"