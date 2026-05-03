package com.desertrose.dto;

import com.desertrose.enums.Role;
import lombok.Data;

@Data
public class UserResponse {
    private Long userId;
    private String username;
    private String email;
    private Role role;
}