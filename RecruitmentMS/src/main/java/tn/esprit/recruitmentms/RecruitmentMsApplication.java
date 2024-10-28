package tn.esprit.recruitmentms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class RecruitmentMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(RecruitmentMsApplication.class, args);
    }

}
