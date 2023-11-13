plugins {
    id("java")
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
//    implementation(project(mapOf("path" to ":rter-server")))
    implementation("org.springframework.boot:spring-boot-starter-web:2.6.0")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.6.0")
    implementation("jakarta.validation:jakarta.validation-api:3.0.2")
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.test {
    useJUnitPlatform()
}
