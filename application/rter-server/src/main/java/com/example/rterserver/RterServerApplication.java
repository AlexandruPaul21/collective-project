package com.example.rterserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration;

@SpringBootApplication(exclude = LiquibaseAutoConfiguration.class)
public class RterServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(RterServerApplication.class, args);
    }
}
