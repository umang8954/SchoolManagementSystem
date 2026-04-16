package com.school.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * SwaggerConfig - Configuration for Swagger/OpenAPI documentation
 * 
 * Access Swagger UI at: http://localhost:8080/swagger-ui.html
 * Access OpenAPI JSON at: http://localhost:8080/v3/api-docs
 */
@Configuration
public class SwaggerConfig {
    
    /**
     * Create OpenAPI configuration
     * This provides the metadata for the API documentation
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("School Management System API")
                        .description("A comprehensive learning project demonstrating CRUD operations and API documentation using Spring Boot.\n\n" +
                                "## Key Features:\n" +
                                "- **Student Management**: Create, Read, Update, Delete students\n" +
                                "- **Course Management**: Manage courses offered in the school\n" +
                                "- **Enrollment Management**: Manage student enrollments in courses\n" +
                                "- **Database**: H2/MySQL integration with JPA/Hibernate\n\n" +
                                "## How to Use:\n" +
                                "1. Start the application on port 8080\n" +
                                "2. Use Swagger UI to test APIs\n" +
                                "3. Monitor logs for application activity")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("School Management System")
                                .email("admin@school.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html"))
                );
    }
}
