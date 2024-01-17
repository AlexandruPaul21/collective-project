package com.example.rterserver.email.controller;

import com.example.rterserver.donation.model.Donation;
import com.example.rterserver.email.dto.DonationEmailRequest;
import com.example.rterserver.email.dto.EmailRequest;
import com.example.rterserver.email.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/donate/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @Operation(summary = "Send a donation email for food or item", description = "This endpoint is used to send a donation email. ")
    @PostMapping("/donation")
    public ResponseEntity<?> sendDonationEmail(@RequestBody DonationEmailRequest donationEmailRequest) {
        try {
            emailService.sendDonationEmail(donationEmailRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("An error occurred while sending an email for the donation: " + ex.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "Send an email", description = "This endpoint is used to send an email. ")
    @PostMapping
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendEmail(emailRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("An error occurred while sending an email: " + ex.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
