package com.example.rterserver.donation.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class PaymentResponse {
    @Schema(description = "The status of the payment")
    private String status;
    @Schema(description = "The message of the payment")
    private String message;

    public PaymentResponse() {
    }

    public PaymentResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
