package com.example.rterserver.user.model;

import com.example.rterserver.enums.Gender;
import com.example.rterserver.enums.UserType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 64)
    private String username;

    @Column(nullable = false, length = 64)
    private String name;

    @Column(nullable = false, length = 64)
    private String password;

    @Column(nullable = false, length = 64)
    private String email;

    @Column(nullable = false, length = 64)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType userType;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private int rating;

    public User(String username, String name, String password, String email, String address, Gender gender, UserType userType, LocalDateTime createdAt, int rating) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.address = address;
        this.gender = gender;
        this.userType = userType;
        this.createdAt = createdAt;
        this.rating = rating;
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

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
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
}
