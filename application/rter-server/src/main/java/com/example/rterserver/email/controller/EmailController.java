package com.example.rterserver.email.controller;

import com.example.rterserver.common.ResponseDto;
import com.example.rterserver.email.dto.EmailRequest;
import com.example.rterserver.email.service.EmailService;
import com.example.rterserver.ngo.model.Ngo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/donate/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @Operation(summary = "Send an email", description = "This endpoint is used to send an email. ")
    @PostMapping
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        String to = emailRequest.recipient();
        String subject = emailRequest.subject();
        String body = emailRequest.body();

        emailService.sendEmail(to, subject, body);
        return "Email sent successfully!";
    }
}
