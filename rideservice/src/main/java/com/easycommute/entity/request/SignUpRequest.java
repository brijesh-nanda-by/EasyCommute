package com.easycommute.entity.request;

import lombok.Data;

@Data
public class SignUpRequest {
    private String userId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String password;

    // Constructors
    public SignUpRequest() {
    }

    public SignUpRequest(String userId, String firstName, String lastName, String emailId, String password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.password = password;
    }
}

