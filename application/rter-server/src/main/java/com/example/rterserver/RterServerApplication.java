package com.example.rterserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {LiquibaseAutoConfiguration.class, SecurityAutoConfiguration.class})
public class   RterServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(RterServerApplication.class, args);
    }
}
