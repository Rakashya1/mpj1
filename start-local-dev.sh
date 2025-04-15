#!/bin/bash

# Start MongoDB and Elasticsearch with Docker
echo "Starting MongoDB and Elasticsearch with Docker..."
docker run -d --name mongodb -p 27017:27017 mongo:latest
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "xpack.security.enabled=false" -e "ES_JAVA_OPTS=-Xms256m -Xmx256m" docker.elastic.co/elasticsearch/elasticsearch:8.17.4

# Wait for MongoDB and Elasticsearch to be ready
echo "Waiting for MongoDB and Elasticsearch to be ready..."
sleep 10

# Start the backend
echo "Starting the backend..."
cd java-ecommerce
./mvnw spring-boot:run -Dspring.profiles.active=dev &
cd ..

# Wait for the backend to be ready
echo "Waiting for the backend to be ready..."
sleep 10

# Start the frontend
echo "Starting the frontend..."
npm run dev
