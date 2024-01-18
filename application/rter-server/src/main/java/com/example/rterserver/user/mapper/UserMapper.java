package com.example.rterserver.user.mapper;


import com.example.rterserver.user.dto.UserResponse;
import com.example.rterserver.user.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * This class represents the mapper for the User entity.
 */
@Component
public final class UserMapper {
    public static UserResponse entityToDto(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getName(), user.getPassword(), user.getEmail(),
                user.getAddress(), user.getGender(), user.getCreatedAt(), user.getRating(), user.getDescription());
    }

    public static List<UserResponse> entityListToDto(List<User> users) {
        return users.stream()
                .map(UserMapper::entityToDto)
                .toList();
    }
}
