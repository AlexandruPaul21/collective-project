package com.example.rterserver.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import liquibase.integration.spring.SpringLiquibase;

@Configuration
public class LiquibaseConfig {

    @Bean
    public SpringLiquibase liquibase(DataSource dataSource, ResourceLoader resourceLoader) {
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog("classpath:db.changelog/changelog-master.xml");
        liquibase.setResourceLoader(resourceLoader);
        return liquibase;
    }
}
