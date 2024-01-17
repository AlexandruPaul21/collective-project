package com.example.rterserver.email.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

/**
 * This class represents the request body for the 'contact us' email endpoint.
 *
 * @param body
 * @param idUser
 * @param idNgo
 */
public record EmailRequest(
        @Schema(description = "The body of the email (required)")
        @NotBlank(message = "Body cannot be blank")
        String body,

        @Schema(description = "The id of the user that is sending the email (required)")
        @NotBlank(message = "User id cannot be blank")
        Long idUser,

        @Schema(description = "The id of the ngo that is receiving the email (required)")
        @NotBlank(message = "Ngo id cannot be blank")
        Long idNgo

) {
    public EmailRequest(String body, Long idUser, Long idNgo) {
        this.body = body;
        this.idUser = idUser;
        this.idNgo = idNgo;
    }
}

