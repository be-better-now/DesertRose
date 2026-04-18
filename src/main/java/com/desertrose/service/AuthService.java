package com.desertrose.service;

import com.desertrose.entity.Users;
import com.desertrose.enums.Role;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {
    UserDetails loadUserByUsername(String username);
    Users register(String username, String password, String email, Role role);
}
