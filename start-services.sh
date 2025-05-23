#!/bin/bash

# Stop all containers
echo "Stopping all containers..."
docker-compose down

# Start core services
echo "Starting core services..."
docker-compose up -d mongodb elasticsearch

# Wait for MongoDB
echo "Waiting for MongoDB..."
until docker-compose exec -T mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
    sleep 2
done

# Enhanced Elasticsearch health check
echo "Waiting for Elasticsearch..."
max_attempts=30
attempt=0
elasticsearch_available=true

until curl -s "http://localhost:9200/_cluster/health" | grep -q '"status":"green"\|"status":"yellow"' && \
      curl -s "http://localhost:9200/_cat/indices?h=index" | grep -q .; do
    attempt=$((attempt + 1))
    if [ $attempt -eq $max_attempts ]; then
        echo "Elasticsearch failed to become healthy after $max_attempts attempts"
        echo "Will continue with Elasticsearch disabled"
        elasticsearch_available=false
        break
    fi
    echo "Waiting for Elasticsearch to be ready... (attempt $attempt/$max_attempts)"
    sleep 5
done

if [ "$elasticsearch_available" = true ]; then
    echo "Elasticsearch is healthy!"
    # Start the backend with default profile
    echo "Starting backend with Elasticsearch enabled..."
    docker-compose up -d backend
else
    echo "Starting backend with Elasticsearch disabled..."
    # Start the backend with noelasticsearch profile
    docker-compose up -d -e SPRING_PROFILES_ACTIVE=noelasticsearch -e ELASTICSEARCH_ENABLED=false backend
fi

# Quick check if backend started
echo "Checking if backend is up..."
max_attempts=30
attempt=0

until curl -s http://localhost:8080/api/health > /dev/null; do
    attempt=$((attempt + 1))
    if [ $attempt -eq $max_attempts ]; then
        echo "Backend failed to start after $max_attempts attempts"
        docker-compose logs backend
        exit 1
    fi
    echo "Waiting for backend... (attempt $attempt/$max_attempts)"
    sleep 2
done

echo "Backend is up!"

# Start the frontend
echo "Starting frontend..."
docker-compose up -d frontend

echo "All services started successfully!"