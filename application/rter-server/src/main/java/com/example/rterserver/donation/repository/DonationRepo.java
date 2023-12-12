package com.example.rterserver.donation.repository;

import com.example.rterserver.donation.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepo extends JpaRepository<Donation,Long> {
}
