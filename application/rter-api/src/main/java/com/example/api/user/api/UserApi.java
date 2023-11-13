//package com.example.api.user.api;
//
//import com.example.api.user.dto.UserRequest;
//import com.example.api.user.dto.UserResponse;
//import jakarta.validation.Valid;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RequestMapping("/users")
//public interface UserApi {
//
//    @GetMapping
//    ResponseEntity<List<UserResponse>> getAllUsers();
//
//    @GetMapping("/{userId}")
//    ResponseEntity<UserResponse> getUserById(@PathVariable("userId") Long userId);
//
//    @PostMapping
//    ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest userRequest);
//
//    @PutMapping("/{userId}")
//    ResponseEntity<?> updateUser(@PathVariable("userId") Long userId, @RequestBody UserRequest userRequest);
//
//    @DeleteMapping("/{userId}")
//    ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId);
//}
