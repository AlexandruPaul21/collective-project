package com.example.rterserver.user.exception;

/**
 * This class represents the exception that is thrown when a user is not found.
 */
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
