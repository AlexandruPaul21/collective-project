package com.example.rterserver.user.controller;

//import com.example.api.user.api.UserApi;
//import com.example.api.user.dto.UserRequest;
//import com.example.api.user.dto.UserResponse;

import com.example.rterserver.user.dto.UserRequest;
import com.example.rterserver.user.dto.UserResponse;
import com.example.rterserver.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //    @Override
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //    @Override
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("userId") Long userId) {
        UserResponse user = userService.findResponseById(userId);
        return ResponseEntity.ok(user);
    }

    //    @Override
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest userRequest) {
        UserResponse createdUser = userService.save(userRequest);
        return ResponseEntity.ok(createdUser);
    }

    //    @Override
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable("userId") Long userId, @RequestBody UserRequest userRequest) {
        userService.update(userRequest, userId);
        return ResponseEntity.ok().build();
    }

    //    @Override
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId) {
        userService.delete(userId);
        return ResponseEntity.ok().build();
    }
}

