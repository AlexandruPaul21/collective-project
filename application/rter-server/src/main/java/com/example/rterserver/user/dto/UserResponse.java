package com.example.rterserver.user.dto;

import com.example.rterserver.enums.Gender;
import com.example.rterserver.enums.UserType;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String username,
        String name,
        String password,
        String email,
        String address,
        Gender gender,
        UserType userType,
        LocalDateTime createdAt,
        int rating
) {
    public UserResponse(Long id, String username, String name, String password, String email, String address, Gender gender, UserType userType, LocalDateTime createdAt, int rating) {
        this.id = id;
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
}
