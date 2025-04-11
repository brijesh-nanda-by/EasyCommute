package com.easycommute.entity.request;

public class SignInRequest {
    private String emailId;
    private String password;

    // Constructors
    public SignInRequest() {
    }

    public SignInRequest(String emailId, String password) {
        this.emailId = emailId;
        this.password = password;
    }

    // Getters and Setters
    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

