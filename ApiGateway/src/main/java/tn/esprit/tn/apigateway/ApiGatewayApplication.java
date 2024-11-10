package tn.esprit.tn.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
@EnableDiscoveryClient

public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

@Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder routeLocatorBuilder){
        return  routeLocatorBuilder.routes()
                .route("MSGestProject",r->r.path("/equipe/**")
                        .uri("http://gestprojet:8088"))
                .route("MSGestProject",r->r.path("/projet/**")
                        .uri("http://gestprojet:8088"))
                .route("MSGestProject",r->r.path("/tache/**")
                        .uri("http://gestprojet:8088"))
                .route("MSExpressService", r -> r.path("/users/**", "/auth/**") // routes du microservice express
                        .uri("http://node-app:5000"))  // URI du microservice Express
                .route("MSGestionDept", r -> r.path("/api/departements/**")
                        .uri("http://gestdepartment:8089"))
                .route("cours-service", r -> r.path("/api/cours/**")
                        .uri("lb://COURS-SERVICE")) // Utilise Eureka pour la découverte de service
                .route("section-service", r -> r.path("/api/sections/**")
                        .uri("lb://COURS-SERVICE")) // Utilise Eureka pour la découverte de service
                .route("contenu-service", r -> r.path("/api/contenus/**")
                        .uri("lb://COURS-SERVICE")) // Utilise Eureka pour la découverte de service
                .route("gestionconge",r->r.path("/conges/**")
                        .uri("http://conge:8087"))
                .route("RecruitmentMS",r->r.path("/demandes/**")
                        .uri("http://gestjobs:8086"))
                .route("RecruitmentMS",r->r.path("/joboffers/**")
                        .uri("http://gestjobs:8086"))
                .build();
}


}
