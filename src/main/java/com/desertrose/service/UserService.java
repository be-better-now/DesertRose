package com.desertrose.service;

import com.desertrose.entity.Users;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    Users findByUsername(String username);
    Users save(Users user);
}
