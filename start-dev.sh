#!/bin/bash

# Stop any running containers
echo "Stopping any running containers..."
docker-compose down

# Start MongoDB and Elasticsearch
echo "Starting MongoDB and Elasticsearch..."
docker-compose up -d mongodb elasticsearch

# Wait for MongoDB and Elasticsearch to be ready
echo "Waiting for MongoDB and Elasticsearch to be ready..."
sleep 10

# Start the backend
echo "Starting the backend..."
docker-compose up -d backend

# Wait for the backend to be ready
echo "Waiting for the backend to be ready..."
sleep 10

# Start the frontend
echo "Starting the frontend..."
docker-compose up -d frontend

echo "All services started. You can access the frontend at http://localhost:5173"
