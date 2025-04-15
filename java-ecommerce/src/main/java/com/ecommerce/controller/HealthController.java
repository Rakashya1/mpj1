package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecommerce.model.Product;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    @GetMapping
    public String healthCheck() {
        return "OK";
    }

    @GetMapping("/detailed")
    public ResponseEntity<Map<String, String>> checkDetailedHealth() {
        Map<String, String> status = new HashMap<>();
        
        // Check MongoDB
        try {
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));
            status.put("mongodb", "connected");
        } catch (Exception e) {
            status.put("mongodb", "disconnected");
        }

        // Check Elasticsearch
        try {
            boolean esConnected = elasticsearchOperations.indexOps(Product.class).exists();
            status.put("elasticsearch", esConnected ? "connected" : "disconnected");
        } catch (Exception e) {
            status.put("elasticsearch", "disconnected");
        }

        return ResponseEntity.ok(status);
    }
}