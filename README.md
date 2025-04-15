# E-commerce Application with React Frontend and Java Spring Boot Backend

This project is an e-commerce application with a React frontend and a Java Spring Boot backend. The backend connects to MongoDB and Elasticsearch for data storage and search functionality.

## Prerequisites

- Docker and Docker Compose
- Node.js and npm
- Java 17 or higher
- Maven

## Project Structure

- `java-ecommerce/`: Java Spring Boot backend
- `src/`: React frontend
- `docker-compose.yml`: Docker Compose configuration for all services

## Setup Instructions

### Option 1: Using Docker Compose (Recommended for Production-like Environment)

1. Start all services using the provided script:

```bash
./start-dev.sh
```

This script will:
- Start MongoDB and Elasticsearch
- Start the Java backend
- Start the React frontend

2. Access the application at http://localhost:5173

### Option 2: Local Development

1. Start MongoDB and Elasticsearch using Docker:

```bash
# Start MongoDB
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  mongo:latest

# Start Elasticsearch with reduced memory
docker run -d \
  --name elasticsearch \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  -e "ES_JAVA_OPTS=-Xms256m -Xmx256m" \
  docker.elastic.co/elasticsearch/elasticsearch:8.17.4
```

2. Start the Java backend:

```bash
cd java-ecommerce
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

3. In a new terminal, start the React frontend:

```bash
npm run dev
```

4. Access the application at http://localhost:5173

### Option 3: Quick Start for Local Development

Use the provided script to start all components for local development:

```bash
./start-local-dev.sh
```

## Troubleshooting

### Checking Connections

1. Visit http://localhost:5173/connection-test to check if the frontend can connect to the backend

2. Check MongoDB connection:

```bash
docker exec -it mongodb mongosh
use ecommerce
db.products.find()  # View all products
```

3. Check Elasticsearch connection:

```bash
curl -X GET "http://localhost:9200/_cat/indices?v"
```

### Common Issues

1. **Backend can't connect to MongoDB or Elasticsearch**
   - Ensure the containers are running: `docker ps`
   - Check container logs: `docker logs mongodb` or `docker logs elasticsearch`
   - Verify the connection settings in `application.properties`

2. **Frontend can't connect to Backend**
   - Ensure the backend is running: `curl http://localhost:8080/api/health`
   - Check CORS configuration in `WebConfig.java`
   - Verify the API_BASE_URL in `apiService.ts`

3. **GitHub Codespace Specific Issues**
   - In GitHub Codespaces, services might need to be accessed using different hostnames
   - Update connection strings to use service names from docker-compose.yml instead of localhost
   - Ensure ports are properly forwarded in the Codespace

## API Endpoints

- List all products: GET http://localhost:8080/api/products
- Search products: GET http://localhost:8080/api/products/search?query={query}
- Filter products: GET http://localhost:8080/api/products/filter?categories={categories}&minPrice={minPrice}&maxPrice={maxPrice}&rating={rating}
- Get product by ID: GET http://localhost:8080/api/products/{id}
- Health check: GET http://localhost:8080/api/health
