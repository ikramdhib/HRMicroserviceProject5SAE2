package tn.esprit.apigateway;

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
			.route("RecruitmentMS",r->r.path("/demandes/**")
					.uri("http://localhost:8086"))
			.route("RecruitmentMS",r->r.path("/joboffers/**")
					.uri("http://localhost:8086"))
			.build();
}

}
