package com.example.rterserver.donation.dto;

import com.example.rterserver.enums.DonationType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

public class NonPaymentRequest {

    @Column(nullable = false)
    @Schema(description = "The date and time when the donation was made")
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The type of the donation")
    private DonationType type;

    @Column(nullable = false)
    @Schema(description = "The Id of the user making the donation")
    private Long iduser;

    @Column(nullable = false )
    @Schema(description = "the id of the NGO that receives the donation ")
    private Long idngo;

    public NonPaymentRequest(LocalDateTime createdAt, DonationType type, Long iduser, Long idngo) {
        this.createdAt = createdAt;
        this.type = type;
        this.iduser = iduser;
        this.idngo = idngo;
    }

    public NonPaymentRequest() {
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public DonationType getType() {
        return type;
    }

    public void setType(DonationType type) {
        this.type = type;
    }

    public Long getIduser() {
        return iduser;
    }

    public void setIduser(Long iduser) {
        this.iduser = iduser;
    }

    public Long getIdngo() {
        return idngo;
    }

    public void setIdngo(Long idngo) {
        this.idngo = idngo;
    }
}
