package com.ecommerce.repository.mongo;

import com.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ProductMongoRepository extends MongoRepository<Product, String> {

    List<Product> findByCategory(String category);
    
    Page<Product> findByCategory(String category, Pageable pageable);
    
    @Query("{price: {$gte: ?0, $lte: ?1}}")
    List<Product> findByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);
    
    @Query("{rating: {$gte: ?0}}")
    List<Product> findByMinimumRating(Double rating);
    
    @Query("{$and: [{category: {$in: ?0}}, {price: {$gte: ?1, $lte: ?2}}, {rating: {$gte: ?3}}]}")
    List<Product> findByFilters(List<String> categories, BigDecimal minPrice, BigDecimal maxPrice, Double rating);
    
    // New methods for search functionality
    @Query("{name: {$regex: ?0, $options: 'i'}}")
    List<Product> findByNameContainingIgnoreCase(String name);
    
    @Query("{description: {$regex: ?0, $options: 'i'}}")
    List<Product> findByDescriptionContainingIgnoreCase(String description);
    
    @Query("{$or: [{name: {$regex: ?0, $options: 'i'}}, {description: {$regex: ?0, $options: 'i'}}]}")
    List<Product> findByNameOrDescriptionContainingIgnoreCase(String searchTerm);
    
    @Query("{$or: [{name: {$regex: ?0, $options: 'i'}}, {description: {$regex: ?0, $options: 'i'}}], $and: [{category: {$in: ?1}}, {price: {$gte: ?2, $lte: ?3}}, {rating: {$gte: ?4}}]}")
    List<Product> findBySearchTermAndFilters(String searchTerm, List<String> categories, BigDecimal minPrice, BigDecimal maxPrice, Double rating);
    
    // Pageable versions for search results
    @Query("{$or: [{name: {$regex: ?0, $options: 'i'}}, {description: {$regex: ?0, $options: 'i'}}]}")
    Page<Product> findByNameOrDescriptionContainingIgnoreCase(String searchTerm, Pageable pageable);
    
    @Query("{$or: [{name: {$regex: ?0, $options: 'i'}}, {description: {$regex: ?0, $options: 'i'}}], $and: [{category: {$in: ?1}}, {price: {$gte: ?2, $lte: ?3}}, {rating: {$gte: ?4}}]}")
    Page<Product> findBySearchTermAndFilters(String searchTerm, List<String> categories, BigDecimal minPrice, BigDecimal maxPrice, Double rating, Pageable pageable);
    
    // Method to find products by brand
    @Query("{brand: {$regex: ?0, $options: 'i'}}")
    List<Product> findByBrandContainingIgnoreCase(String brand);
    
    // Method to find products by brand and other filters
    @Query("{brand: {$regex: ?0, $options: 'i'}, $and: [{category: {$in: ?1}}, {price: {$gte: ?2, $lte: ?3}}, {rating: {$gte: ?4}}]}")
    List<Product> findByBrandAndFilters(String brand, List<String> categories, BigDecimal minPrice, BigDecimal maxPrice, Double rating);
}