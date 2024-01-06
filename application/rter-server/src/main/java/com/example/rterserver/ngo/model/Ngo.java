package com.example.rterserver.ngo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

@Entity
@Table(name = "ngo")
public class Ngo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 512)
    @Schema(description = "The name of the ngo")
    String name;
    @Column(nullable = false, length = 512)
    @Schema(description = "The contact details of the ngo or null if not available")
    String contact;
    @Column(nullable = false, length = 512)
    @Schema(description = "The website of the ngo or null if not available")
    String website;

    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    @Column(nullable = false, length = 512)
    @Schema(description = "The image url of the ngo or null if not available")
    String imageUrl;

    public Ngo(String name, String contact, String website, byte[] image, String imageUrl) {
        this.name = name;
        this.contact = contact;
        this.website = website;
        this.image = image;
        this.imageUrl = imageUrl;
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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String toString() {
        return "Name: " + name + "\nContact: " + contact + "\nWebsite: " + website;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

