package com.example.rterserver.donation.service;

import com.example.rterserver.donation.dto.PaymentRequest;
import com.example.rterserver.donation.dto.PaymentResponse;
import com.example.rterserver.donation.model.Donation;
import com.example.rterserver.user.exception.NotFoundException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    @Value("${stripe.secret-key}")
    private static String secretKey;

    @Autowired
    private DonationService donationService;

    @PostConstruct
    public static void init() {
        Stripe.apiKey = "sk_test_51OZGIJBvOG8Oe6QObayKA9HuUHLjnGFfrNWcJDLOqxiYJF0comp0udQcqBHKWk3f3MuwIX2QGkVC4DGMGlq330ZD006H1bjZcB";
    }

    @Transactional
    public PaymentResponse charge(PaymentRequest paymentRequest) {
        Map<String,Object> chargeParams = new HashMap<>();
        chargeParams.put("amount",paymentRequest.getAmount());
        chargeParams.put("currency",paymentRequest.getCurrency());
        chargeParams.put("description",paymentRequest.getDescription());
        chargeParams.put("source",paymentRequest.getToken());
        Charge created;
        try {
            Donation donation = donationService.prepareDonation(paymentRequest);
            created = Charge.create(chargeParams);
            donationService.save(donation);
        } catch (StripeException e){
            return new PaymentResponse(e.getCode(),e.getUserMessage());
        } catch (NotFoundException e) {
            return new PaymentResponse("404",e.getMessage());
        }

        return new PaymentResponse(created.getStatus(),created.getId());
    }

}
