package com.example.rterserver.donation.service;

import com.example.rterserver.donation.dto.NonPaymentRequest;
import com.example.rterserver.donation.dto.PaymentRequest;
import com.example.rterserver.donation.model.Donation;
import com.example.rterserver.donation.repository.DonationRepo;
import com.example.rterserver.email.service.EmailService;
import com.example.rterserver.enums.DonationType;
import com.example.rterserver.ngo.model.Ngo;
import com.example.rterserver.ngo.service.NgoService;
import com.example.rterserver.user.exception.NotFoundException;
import com.example.rterserver.user.model.User;
import com.example.rterserver.user.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DonationService {

    private final DonationRepo donationRepo;
    @Autowired
    private NgoService ngoService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    public DonationService(DonationRepo donationRepo) {
        this.donationRepo = donationRepo;
    }

    @Transactional
    public Donation save(Donation donation){
        Donation donationToSave = new Donation(donation.getAmount(),donation.getType(),donation.getDetails(),
            donation.getCreatedat(),donation.getIduser(),donation.getIdngo());
        if(donation.getType() == DonationType.FOOD || donation.getType() == DonationType.ITEM)
            emailService.sendDonationEmail(donation);
        return donationRepo.save(donationToSave);
    }

    public Donation prepareDonation(PaymentRequest paymentRequest){
        User user = userService.findByUsername(paymentRequest.getUsername());
        Ngo ngo = ngoService.findByName(paymentRequest.getNgoName());
        Donation donation = new Donation();
        donation.setAmount(paymentRequest.getAmount());
        donation.setType(DonationType.PAYMENT);
        donation.setDetails(paymentRequest.getDescription());
        donation.setCreatedat(LocalDateTime.now());
        donation.setIdngo(ngo.getId());
        donation.setIduser(user.getId());
        return donation;
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

    @Transactional
    public Donation saveNonPayment(NonPaymentRequest nonPaymentRequest) {
        Donation donation = new Donation();
        donation.setAmount(0);
        donation.setType(nonPaymentRequest.getType());
        donation.setDetails("Donate other things.");
        donation.setCreatedat(nonPaymentRequest.getCreatedAt());
        donation.setIdngo(nonPaymentRequest.getIdngo());
        donation.setIduser(nonPaymentRequest.getIduser());
        donationRepo.save(donation);
        emailService.sendDonationEmail(donation);
        return donation;
    }
}
