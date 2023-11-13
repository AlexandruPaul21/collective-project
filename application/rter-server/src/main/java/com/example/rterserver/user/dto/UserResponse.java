package com.example.api.user.dto;

import com.example.rterserver.enums.Gender;
import com.example.rterserver.enums.UserType;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UserResponse(
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
}
