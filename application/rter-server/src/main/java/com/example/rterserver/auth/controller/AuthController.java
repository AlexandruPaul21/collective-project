package com.example.rterserver.auth.controller;

import com.example.rterserver.auth.exception.AuthException;
import com.example.rterserver.auth.service.AuthService;
import com.example.rterserver.user.dto.UserRequest;
import com.example.rterserver.user.dto.UserResponse;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@OpenAPIDefinition(info = @io.swagger.v3.oas.annotations.info.Info(title = "Auth API", version = "v1"))
@Validated
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/login")
    @Operation(summary = "Login", description = "This endpoint is used to check the user credentials.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = String.class))}),
        @ApiResponse(responseCode = "401", description = "Unauthorized",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = String.class))}),
    })
    public ResponseEntity<Object> login() {
        return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/signup")
    @Operation(summary = "Signup", description = "This endpoint is used to create a new user." +
        "The details of the user to be created are passed in the request body. " +
        "The response body contains the details of the created user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User created successfully",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = UserResponse.class))}),
        @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = String.class))}),
        @ApiResponse(responseCode = "500", description = "Internal server error",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = UserResponse.class))})
    })
    public ResponseEntity<?> signup(@Valid @RequestBody UserRequest userRequest) {
        try {
            return ResponseEntity.ok(authService.signup(userRequest));
        } catch(AuthException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
