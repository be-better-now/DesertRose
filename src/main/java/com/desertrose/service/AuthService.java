package com.desertrose.service;

import com.desertrose.dto.LoginRequest;
import com.desertrose.dto.RegisterRequest;
import com.desertrose.dto.UserResponse;
import com.desertrose.entity.Users;
import com.desertrose.enums.Role;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {
    UserDetails loadUserByUsername(String username);
    UserResponse login(LoginRequest request);
    UserResponse register(RegisterRequest request);
}
