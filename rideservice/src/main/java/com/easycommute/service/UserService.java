package com.easycommute.service;

import com.easycommute.entity.db.User;
import com.easycommute.entity.request.SignInRequest;
import com.easycommute.entity.request.SignUpRequest;
import com.easycommute.exception.AuthenticationException;
import com.easycommute.exception.DataConflictException;
import com.easycommute.exception.InternalServerException;
import com.easycommute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Signup
    public User signup(SignUpRequest signupRequest) {
        try {
            // Check if userId already exists
            if (userRepository.findByUserId(signupRequest.getUserId()).isPresent()) {
                throw new DataConflictException("User ID already taken.");
            }

            // Check if email already registered
            if (userRepository.findByEmailId(signupRequest.getEmailId()).isPresent()) {
                throw new DataConflictException("Email already registered.");
            }

            User newUser = new User(
                    signupRequest.getUserId(),
                    signupRequest.getFirstName(),
                    signupRequest.getLastName(),
                    signupRequest.getEmailId(),
                    signupRequest.getPassword()
            );

            userRepository.save(newUser);
            return newUser;

        } catch (DataConflictException e) {
            // Bubble up custom exceptions
            throw e;
        } catch (Exception e) {
            // Catch unexpected DB or system issues
            throw new InternalServerException("Signup failed due to an unexpected error.", e);
        }
    }


    // Signin
    public User signin(SignInRequest signInRequest) {
        User user = userRepository.findByEmailId(signInRequest.getEmailId())
                .orElseThrow(() -> new AuthenticationException("User not found."));

        if (!user.getPassword().equals(signInRequest.getPassword())) {
            throw new AuthenticationException("Invalid password.");
        }

        return user;
    }

}
