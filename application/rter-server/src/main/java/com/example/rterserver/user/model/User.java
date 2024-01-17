package com.example.rterserver.user.model;

import com.example.rterserver.enums.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

import java.time.LocalDateTime;

/**
 * This class represents the user.
 */
@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the user")
    private Long id;

    @Column(nullable = false, length = 64)
    @Schema(description = "The username of the user")
    private String username;

    @Column(nullable = false, length = 64)
    @Schema(description = "The name of the user")
    private String name;

    @Column(nullable = false, length = 64)
    @Schema(description = "The password of the user")
    private String password;

    @Column(nullable = false, length = 64)
    @Schema(description = "The email of the user")
    private String email;

    @Column(nullable = false, length = 64)
    @Schema(description = "The address of the user")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The gender of the user")
    private Gender gender;

    @Column(nullable = false)
    @Schema(description = "The date and time when the user was created")
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @Schema(description = "The rating of the user")
    private int rating;

    @Column(nullable = false)
    @Schema(description = "The description of the user")
    private String description;

    public User(String username, String name, String password, String email, String address, Gender gender, LocalDateTime createdAt, int rating, String description) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.address = address;
        this.gender = gender;
        this.createdAt = createdAt;
        this.rating = rating;
        this.description = description;
    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
