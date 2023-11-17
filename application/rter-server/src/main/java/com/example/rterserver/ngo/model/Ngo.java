package com.example.rterserver.ngo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ngo")
public class Ngo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 64)
    String name;
    @Column(nullable = false, length = 256)
    String contact;
    @Column(nullable = false, length = 64)
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

