package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.mongo.ProductMongoRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Alternative implementation of ProductService that works without Elasticsearch.
 * This service will be used when elasticsearch.enabled=false.
 */
@Service
@Primary
@ConditionalOnProperty(name = "elasticsearch.enabled", havingValue = "false")
public class ProductServiceNoElasticsearch implements ProductService {

    private final ProductMongoRepository productMongoRepository;

    public ProductServiceNoElasticsearch(ProductMongoRepository productMongoRepository) {
        this.productMongoRepository = productMongoRepository;
    }

    @Override
    public List<Product> findAll() {
        return productMongoRepository.findAll();
    }

    @Override
    public Optional<Product> findById(String id) {
        return productMongoRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return productMongoRepository.save(product);
    }

    @Override
    public void deleteById(String id) {
        productMongoRepository.deleteById(id);
    }

    @Override
    public List<Product> search(String query) {
        // Implement a simple search using MongoDB instead of Elasticsearch
        return productMongoRepository.findByNameOrDescriptionContainingIgnoreCase(query);
    }

    @Override
    public List<Product> filter(List<String> categories, double minPrice, double maxPrice, double minRating) {
        // Implement filtering using MongoDB instead of Elasticsearch
        BigDecimal minPriceBD = BigDecimal.valueOf(minPrice);
        BigDecimal maxPriceBD = BigDecimal.valueOf(maxPrice);
        Double minRatingD = minRating;
        
        if (categories != null && !categories.isEmpty()) {
            return productMongoRepository.findByFilters(categories, minPriceBD, maxPriceBD, minRatingD);
        } else {
            // If no categories specified, use price and rating filters only
            return productMongoRepository.findByPriceRange(minPriceBD, maxPriceBD);
        }
    }
}
