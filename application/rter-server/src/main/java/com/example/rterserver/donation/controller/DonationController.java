package com.example.rterserver.donation.controller;

import com.example.rterserver.common.ResponseDto;
import com.example.rterserver.donation.dto.NonPaymentRequest;
import com.example.rterserver.donation.dto.PaymentRequest;
import com.example.rterserver.donation.dto.PaymentResponse;
import com.example.rterserver.donation.model.Donation;
import com.example.rterserver.donation.service.DonationService;
import com.example.rterserver.donation.service.StripeService;
import com.stripe.exception.StripeException;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donations")
@OpenAPIDefinition(info = @Info(title = " Donation API", version = "v1"))
@Validated
public class DonationController {
    private final DonationService donationService;
    private final StripeService stripeService;

    @Autowired
    public DonationController(DonationService donationService, StripeService stripeService) {
        this.donationService = donationService;
        this.stripeService = stripeService;
    }

    @Operation(summary = "Create a new donation.", description = "This endpoint is used to create a new donation.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Donation created successfuly",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = Donation.class))}),
        @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = ResponseDto.class))}),
        @ApiResponse(responseCode = "500", description = "Internal server error",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<Donation> createDonation(@Valid @RequestBody Donation donation) {
        Donation createdDonation = donationService.save(donation);
        return ResponseEntity.ok(createdDonation);
    }

    @Operation(summary = "Get all donations", description = "This endpoint is used to retrieve all donations.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Donations found successfully",
            content = {@Content(mediaType = "application/json",
                array = @ArraySchema(schema = @Schema(implementation = Donation.class)))}),
        @ApiResponse(responseCode = "500", description = "Internal server error",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        List<Donation> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }

    @Operation(summary = "Get donation with specified id", description = "This endpoint is used to retrieve a donation with " +
        "specified id.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Donation found successfully",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = Donation.class))}),
        @ApiResponse(responseCode = "500", description = "Internal server error",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/{donationId}")
    public ResponseEntity<Donation> getDonationById(@PathVariable("donationId") Long donationId) {
        Donation donation = donationService.findById(donationId);
        return ResponseEntity.ok(donation);
    }

    @Operation(summary = "Get a user's donations ", description = "This endpoint is used to retrieve a list donation with " +
        "specified id user.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Donation found successfully",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = Donation.class))}),
        @ApiResponse(responseCode = "500", description = "Internal server error",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/history/{idUser}")
    public ResponseEntity<List<Donation>> getDonationHistory(@PathVariable("idUser") Long idUser) {
        List<Donation> donationHistory = donationService.getDonationHistory(idUser);
        return ResponseEntity.ok(donationHistory);
    }


    @Operation(summary = "Donate payment", description = "This endpoint is used to make a payment donation.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Payment successful",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = PaymentResponse.class))}),
        @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = PaymentResponse.class))}),
        @ApiResponse(responseCode = "500", description = "Internal server error",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = PaymentResponse.class))})
    })
    @PostMapping("/payment")
    public ResponseEntity<PaymentResponse> donatePayment(@Valid @RequestBody PaymentRequest paymentRequest) {
        PaymentResponse paymentResponse = stripeService.charge(paymentRequest);
        return ResponseEntity.ok(paymentResponse);
    }

    @Operation(summary = "Donate non-payment", description = "This endpoint is used to make a non-payment donation.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Donation successful",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = Donation.class))}),
        @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = ResponseDto.class))}),
        @ApiResponse(responseCode = "500", description = "Internal server error",
            content = {@Content(mediaType = "application/json",
                schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping("/non-payment")
    public ResponseEntity<Donation> donateNonPayment(@Valid @RequestBody NonPaymentRequest nonPaymentRequest) {
        return ResponseEntity.ok(donationService.saveNonPayment(nonPaymentRequest));
    }

    @ExceptionHandler(StripeException.class)
    public ResponseEntity<ResponseDto> handleException(Exception e) {
        ResponseDto responseDto = new ResponseDto(e.getMessage());
        return ResponseEntity.badRequest().body(responseDto);
    }

}
