package com.example.rterserver.user.dto;

import com.example.rterserver.enums.Gender;
import com.example.rterserver.enums.UserType;

public record UserRequest(
        String username,
        String name,
        String password,
        String email,
        String address,
        Gender gender,
        UserType userType
) {
    public UserRequest(String username, String name, String password, String email, String address, Gender gender, UserType userType) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.address = address;
        this.gender = gender;
        this.userType = userType;
    }
}
