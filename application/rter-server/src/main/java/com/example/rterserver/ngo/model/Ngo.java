package com.example.rterserver.ngo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

@Entity
@Table(name = "ngo")
public class Ngo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 64)
    @Schema(description = "The name of the ngo")
    String name;
    @Column(nullable = false, length = 256)
    @Schema(description = "The contact details of the ngo or null if not available")
    String contact;
    @Column(nullable = false, length = 64)
    @Schema(description = "The website of the ngo or null if not available")
    String website;

    public Ngo(String name, String contact, String website) {
        this.name = name;
        this.contact = contact;
        this.website = website;
    }

    public Ngo() {

    }

    public String getName() {
        return name;
    }

    public String getContact() {
        return contact;
    }

    public String getWebsite() {
        return website;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String toString() {
        return "Name: " + name + "\nContact: " + contact + "\nWebsite: " + website;
    }
}

