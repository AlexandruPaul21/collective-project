package com.example.rterserver.donation.service;

import com.example.rterserver.donation.model.Donation;
import com.example.rterserver.donation.repository.DonationRepo;
import com.example.rterserver.user.dto.UserResponse;
import com.example.rterserver.user.exception.NotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DonationService {

    private final DonationRepo donationRepo;

    public DonationService(DonationRepo donationRepo) {
        this.donationRepo = donationRepo;
    }

    @Transactional
    public Donation  save(Donation donation){
        Donation donationToSave = new Donation(donation.getAmount(),donation.getType(),donation.getDetails(), LocalDateTime.now(),donation.getIduser(),donation.getIdngo());
        return donationRepo.save(donationToSave);
    }

    public Donation findById(Long id){
        return donationRepo.findById(id).orElseThrow(()->new NotFoundException("Donation not found with id: "+id));
    }

    public List<Donation> getAllDonations(){return donationRepo.findAll();}

    public List<Donation> getDonationHistory(Long idUser) {
        return getAllDonations()
                .stream()
                .filter(donation -> Objects.equals(donation.getIduser(), idUser))
                .collect(Collectors.toList());
    }



}
