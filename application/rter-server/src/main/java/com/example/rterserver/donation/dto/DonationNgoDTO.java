package com.example.rterserver.donation.dto;

import com.example.rterserver.donation.model.Donation;
import com.example.rterserver.ngo.model.Ngo;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;


public class DonationNgoDTO {

    @Schema(description = "the Donations")
    @NotBlank(message = "Token cannot be blank")
    private Donation donation;


    @Schema(description = "the NGO that receives the donation ")
    @NotBlank(message = "Token cannot be blank")
    private Ngo ngo;

    public DonationNgoDTO(Donation donation, Ngo ngo) {
        this.donation = donation;
        this.ngo = ngo;
    }

    public Donation getDonation() {
        return donation;
    }

    public void setDonation(Donation donation) {
        this.donation = donation;
    }

    public Ngo getNgo() {
        return ngo;
    }

    public void setNgo(Ngo ngo) {
        this.ngo = ngo;
    }
}
