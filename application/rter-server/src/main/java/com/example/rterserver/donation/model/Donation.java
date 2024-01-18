package com.example.rterserver.donation.model;

import com.example.rterserver.enums.DonationType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="donation")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the donation")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "The amount of the donation")
    private double amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The type of the donation")
    private DonationType type;

    @Column(nullable = false,length = 256)
    @Schema(description = "Details of the donation")
    private String details;

    @Column(nullable = false)
    @Schema(description = "The date and time when the donation was made")
    private LocalDateTime createdat;

    @Column(nullable = false)
    @Schema(description = "The Id of the user making the donation")
    private Long iduser;

    @Column(nullable = false )
    @Schema(description = "the id of the NGO that receives the donation ")
    private Long idngo;

    public Donation( double amount, DonationType type, String details, LocalDateTime createdat, Long iduser, Long idngo) {
        this.amount = amount;
        this.type = type;
        this.details = details;
        this.createdat = createdat;
        this.iduser = iduser;
        this.idngo = idngo;
    }

    public Donation() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public DonationType getType() {
        return type;
    }

    public void setType(DonationType type) {
        this.type = type;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public LocalDateTime getCreatedat() {
        return createdat;
    }

    public void setCreatedat(LocalDateTime createdat) {
        this.createdat = createdat;
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
