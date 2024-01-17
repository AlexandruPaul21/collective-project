package com.example.rterserver.user.dto;

import com.example.rterserver.enums.Gender;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * This class represents the user request.
 */
public record UserRequest(
        @Schema(description = "The username of the user (required)")
        @NotBlank(message = "Username cannot be blank")
        @Size(min = 3, max = 64, message = "Username must be between 3 and 64 characters")
        String username,
        @Schema(description = "The name of the user (required)")
        @NotBlank(message = "Name cannot be blank")
        @Size(min = 3, max = 64, message = "Name must be between 3 and 64 characters")
        String name,
        @Schema(description = "The password of the user (required)")
        @NotBlank(message = "Password cannot be blank")
        @Size(min = 3, max = 64, message = "Password must be between 3 and 64 characters")
        String password,
        @Schema(description = "The email of the user (required)")
        @NotBlank(message = "Email cannot be blank")
        @Size(min = 3, max = 64, message = "Email must be between 3 and 64 characters")
        String email,
        @Schema(description = "The address of the user (required)")
        @NotBlank(message = "Address cannot be blank")
        @Size(min = 3, max = 64, message = "Address must be between 3 and 64 characters")
        String address,
        @Schema(description = "The gender of the user(required)", allowableValues = {"MALE", "FEMALE"})
        Gender gender
) {
    public UserRequest(String username, String name, String password, String email, String address, Gender gender) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.address = address;
        this.gender = gender;
    }
}
