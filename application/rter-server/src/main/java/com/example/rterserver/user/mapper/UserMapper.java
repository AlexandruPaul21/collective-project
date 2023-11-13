package com.example.rterserver.user.mapper;

//import com.example.api.user.dto.UserResponse;

import com.example.rterserver.user.dto.UserResponse;
import com.example.rterserver.user.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public final class UserMapper {
    public static UserResponse entityToDto(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getName(), user.getPassword(), user.getEmail(),
                user.getAddress(), user.getGender(), user.getUserType(), user.getCreatedAt(), user.getRating());
    }

    public static List<UserResponse> entityListToDto(List<User> users) {
        return users.stream()
                .map(UserMapper::entityToDto)
                .toList();
    }
}
