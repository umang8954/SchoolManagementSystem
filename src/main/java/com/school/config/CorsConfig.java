package com.school.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * CorsConfig - Configuration for Cross-Origin Resource Sharing (CORS)
 * Allows frontend on different port/domain to call backend API
 */
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow frontend URLs to access this API
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",                    // Local development UI
            "http://localhost:5173",                    // Vite default dev server
            "https://school-management-ui.azurewebsites.net" // Azure frontend app
        ));
        
        // Allow these HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        
        // Allow these headers
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // Allow credentials (cookies, auth headers)
        configuration.setAllowCredentials(true);
        
        // Cache CORS preflight response for 3600 seconds (1 hour)
        configuration.setMaxAge(3600L);
        
        // Apply CORS to all API endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}
