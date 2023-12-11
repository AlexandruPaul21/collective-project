package com.example.rterserver.email.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;


public record EmailRequest(
        @Schema(description = "The recipient of the email (required)")
        @NotBlank(message = "Recipient cannot be blank")
        String recipient,
        @Schema(description = "The subject of the email (required)")
        @NotBlank(message = "Subject cannot be blank")
        String subject,
        @Schema(description = "The body of the email (required)")
        @NotBlank(message = "Body cannot be blank")
        String body

) {
  public EmailRequest(String recipient, String subject, String body){
      this.recipient = recipient;
      this.subject = subject;
      this.body = body;
  }
}

