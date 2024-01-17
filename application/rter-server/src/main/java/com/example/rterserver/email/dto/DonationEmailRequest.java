package com.example.rterserver.email.dto;

import com.example.rterserver.enums.DonationType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record DonationEmailRequest(
        @Schema(description = "The id of the user that is sending the email (required)")
        @NotBlank(message = "User id cannot be blank")
        Long idUser,

        @Schema(description = "The id of the ngo that is receiving the email (required)")
        @NotBlank(message = "Ngo id cannot be blank")
        Long idNgo,

        @Schema(description = "The donation type of the user that is sending the email (required)")
        @NotBlank(message = "Donation type cannot be blank")
        DonationType donationType,

        @Schema(description = "The delivery date and time of the user's donation (required)")
        @NotBlank(message = "Donation type cannot be blank")
        String deliveryDate

) {
    public DonationEmailRequest(Long idUser, Long idNgo, DonationType donationType, String deliveryDate) {
        this.idUser = idUser;
        this.idNgo = idNgo;
        this.donationType = donationType;
        this.deliveryDate = deliveryDate;
    }
}

