package com.example.rterserver.donation.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public class PaymentRequest {
    @Schema(description = "The token provided by stripe for the payment")
    @NotBlank(message = "Token cannot be blank")
    private String token;
    @Schema(description = "The amount of the payment")
    @NotBlank(message = "Amount cannot be blank")
    private Integer amount;
    @Schema(description = "The currency of the payment")
    @NotBlank(message = "Currency cannot be blank")
    private String currency;
    @Schema(description = "The description of the payment")
    @NotBlank(message = "Description cannot be blank")
    private String description;
    @Schema(description = "The username of the user making the payment")
    @NotBlank(message = "Username cannot be blank")
    private String username;
    @Schema(description = "The name of the NGO receiving the payment")
    @NotBlank(message = "NGO name cannot be blank")
    private String ngoName;

    public PaymentRequest() {
    }

    public PaymentRequest(String token, Integer amount, String currency, String description, String username, String ngoName) {
        this.token = token;
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.username = username;
        this.ngoName = ngoName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNgoName() {
        return ngoName;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }
}
