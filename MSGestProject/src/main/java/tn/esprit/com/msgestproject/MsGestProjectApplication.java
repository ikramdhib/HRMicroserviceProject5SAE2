package tn.esprit.com.msgestproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MsGestProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsGestProjectApplication.class, args);
    }

}
