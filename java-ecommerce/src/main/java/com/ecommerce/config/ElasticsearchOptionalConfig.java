package com.ecommerce.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;

/**
 * Configuration class that makes Elasticsearch optional.
 * When elasticsearch.enabled=false, this will provide mock implementations
 * of Elasticsearch-related beans to allow the application to start without Elasticsearch.
 */
@Configuration
public class ElasticsearchOptionalConfig {

    /**
     * This bean will only be created if elasticsearch.enabled is set to false.
     * It provides a no-op implementation of ElasticsearchOperations that can be
     * injected into services that depend on Elasticsearch.
     */
    @Bean
    @ConditionalOnProperty(name = "elasticsearch.enabled", havingValue = "false")
    public ElasticsearchOperations elasticsearchOperations() {
        // Return a mock implementation or null - the actual implementation
        // would depend on your application's needs
        return null;
    }
}
