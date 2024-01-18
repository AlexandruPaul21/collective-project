plugins {
    java
    id("org.springframework.boot") version "3.1.5"
    id("io.spring.dependency-management") version "1.1.3"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web:3.1.0")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.0.4")
    implementation("jakarta.validation:jakarta.validation-api:3.0.2")
    testImplementation(platform("org.junit:junit-bom:5.9.2"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    implementation("org.postgresql:postgresql:42.6.0")
    implementation("org.mapstruct:mapstruct:1.5.5.Final")
    implementation("jakarta.validation:jakarta.validation-api:3.0.2")
    compileOnly("org.liquibase:liquibase-core:4.20.0")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")
    implementation("org.springframework:spring-websocket:6.0.13")
    implementation("org.springframework:spring-messaging:6.0.13")
    implementation("io.springfox:springfox-swagger2:3.0.0")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0"){
        exclude(group = "io.swagger.core.v3", module= "swagger-annotations")
    }
    implementation("io.swagger.core.v3:swagger-annotations:2.2.15")
    implementation("org.jsoup:jsoup:1.15.4")
    implementation("org.apache.commons:commons-lang3:3.12.0")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    implementation("com.sun.mail:javax.mail:1.6.2")
    implementation("com.stripe:stripe-java:24.11.0")
    implementation("com.fasterxml.jackson.core:jackson-core:2.16.1")

}

tasks.withType<Test> {
    useJUnitPlatform()
}
