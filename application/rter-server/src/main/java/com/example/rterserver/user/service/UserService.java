package com.example.rterserver.user.service;

//import com.example.api.user.dto.UserRequest;
//import com.example.api.user.dto.UserResponse;

import com.example.rterserver.user.dto.UserRequest;
import com.example.rterserver.user.dto.UserResponse;
import com.example.rterserver.user.exception.NotFoundException;
import com.example.rterserver.user.mapper.UserMapper;
import com.example.rterserver.user.model.User;
import com.example.rterserver.user.repository.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo, UserMapper userMapper) {
        this.userRepo = userRepo;
    }

    @Transactional
    public UserResponse save(UserRequest userRequest) {
        User userToSave = new User(userRequest.username(), userRequest.name(), userRequest.password(),
                userRequest.email(), userRequest.address(), userRequest.gender(),
                LocalDateTime.now(), 10);
        return UserMapper.entityToDto(userRepo.save(userToSave));
    }

    @Transactional
    public UserResponse update(UserRequest userRequest, Long id) {
        User userToUpdate = findById(id);

        userToUpdate.setUsername(userRequest.username());
        userToUpdate.setName(userRequest.name());
        userToUpdate.setPassword(userRequest.password());
        userToUpdate.setEmail(userRequest.email());
        userToUpdate.setAddress(userRequest.address());
        userToUpdate.setGender(userRequest.gender());

        return UserMapper.entityToDto(userRepo.save(userToUpdate));
    }

    @Transactional
    public void delete(Long id) {
        User user = findById(id);
        userRepo.delete(user);
    }

    public User findById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + id));
    }

    public UserResponse findResponseById(Long id) {
        return UserMapper.entityToDto(findById(id));
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username).orElse(null);
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepo.findAll();
        return UserMapper.entityListToDto(users);
    }
}
