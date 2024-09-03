package com.example.pfe.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // Autoriser uniquement cette origine
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Autoriser uniquement ces méthodes
                .allowedHeaders("Authorization", "Content-Type") // Autoriser uniquement ces en-têtes
                .allowCredentials(true); // Autoriser les cookies et l'authentification
    }
}
