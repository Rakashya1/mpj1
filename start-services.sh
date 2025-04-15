#!/bin/bash

# Stop all containers
echo "Stopping all containers..."
docker-compose down

# Start Elasticsearch
echo "Starting Elasticsearch..."
docker-compose up -d elasticsearch

# Wait for Elasticsearch to be ready
echo "Waiting for Elasticsearch to be ready..."
until curl -s http://localhost:9200 > /dev/null; do
    echo "Waiting for Elasticsearch..."
    sleep 5
done

# Start MongoDB
echo "Starting MongoDB..."
docker-compose up -d mongodb

# Wait for MongoDB
echo "Waiting for MongoDB to be ready..."
sleep 10

# Start the backend
echo "Starting backend..."
docker-compose up -d backend

# Wait for backend
echo "Waiting for backend to be ready..."
sleep 15

# Start the frontend
echo "Starting frontend..."
docker-compose up -d frontend

echo "All services started. You can access:"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:8080"