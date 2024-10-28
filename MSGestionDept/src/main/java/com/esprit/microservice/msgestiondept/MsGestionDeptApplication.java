package com.esprit.microservice.msgestiondept;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MsGestionDeptApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsGestionDeptApplication.class, args);
    }

}
