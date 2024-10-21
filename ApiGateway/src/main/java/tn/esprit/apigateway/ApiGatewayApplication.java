package tn.esprit.apigateway;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder.routes()
                .route("cours-service", r -> r.path("/api/cours/**")
                        .uri("lb://COURS-SERVICE")) // Utilise Eureka pour la découverte de service
                .route("section-service", r -> r.path("/api/sections/**")
                        .uri("lb://COURS-SERVICE")) // Utilise Eureka pour la découverte de service
                .route("contenu-service", r -> r.path("/api/contenus/**")
                        .uri("lb://COURS-SERVICE")) // Utilise Eureka pour la découverte de service
                .build();
    }
}

