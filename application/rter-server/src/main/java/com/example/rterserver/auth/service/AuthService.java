package com.example.rterserver.auth.service;

import com.example.rterserver.user.dto.UserRequest;
import com.example.rterserver.user.dto.UserResponse;
import com.example.rterserver.user.service.UserService;
import com.example.rterserver.auth.exception.AuthException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final InMemoryUserDetailsManager inMemoryUserDetailsManager;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder, InMemoryUserDetailsManager inMemoryUserDetailsManager) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.inMemoryUserDetailsManager = inMemoryUserDetailsManager;
    }

    public UserResponse signup(UserRequest userRequest) throws AuthException {
        if(userService.checkIfUsernameOrEmailExists(userRequest.username(), userRequest.email())){
            throw new AuthException("Username or email already exists");
        }
        UserResponse userResponse = userService.save(userRequest);
        UserDetails userDetails = User.withUsername(userRequest.username())
            .password(passwordEncoder.encode(userRequest.password()))
            .roles("ADMIN", "USER")
            .build();
        inMemoryUserDetailsManager.createUser(userDetails);
        return userResponse;
    }
}
