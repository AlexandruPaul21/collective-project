package com.example.rterserver.ngo.exception;

/**
 * This class represents the exception that is thrown when an entity already exists.
 */
public class AlreadyExistsException extends RuntimeException {
    public AlreadyExistsException(String message) {
        super(message);
    }
}
