package com.desertrose.controller;

import com.desertrose.dto.LoginRequest;
import com.desertrose.dto.RegisterRequest;
import com.desertrose.dto.UserResponse;
import com.desertrose.entity.Users;
import com.desertrose.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // cho React gọi
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
}