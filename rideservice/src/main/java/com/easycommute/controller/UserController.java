package com.easycommute.controller;

import com.easycommute.entity.db.User;
import com.easycommute.entity.request.SignInRequest;
import com.easycommute.entity.request.SignUpRequest;
import com.easycommute.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(userService.signup(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<User> signin(@RequestBody SignInRequest signInRequest) {
        return ResponseEntity.ok(userService.signin(signInRequest));
    }
}
