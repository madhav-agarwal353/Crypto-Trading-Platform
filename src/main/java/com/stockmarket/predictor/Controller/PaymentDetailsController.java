package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.PaymentDetails;
import com.stockmarket.predictor.Service.PaymentDetailsService;
import com.stockmarket.predictor.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/PaymentDetails")
public class PaymentDetailsController {

    @Autowired
    private PaymentDetailsService paymentDetailsService;

    @Autowired
    private UserService userService;

    @PostMapping("/payment-Details")
    public ResponseEntity<PaymentDetails> addPaymentDetails(
            @RequestBody PaymentDetails paymentDetails,
            @RequestHeader("Authorization") String token)
            throws Exception {
        User user = userService.findUserByJwtToken(token);
        PaymentDetails paymentDetails1 = paymentDetailsService.addPaymentDetails(
                paymentDetails.getAccountNumber(),
                paymentDetails.getAccountHolderName(),
                paymentDetails.getIfsc(),
                paymentDetails.getBankName(),
                user
        );
        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }

    @GetMapping("/payment-Details")
    public ResponseEntity<?> getUserPaymentDetails(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        PaymentDetails paymentDetails = paymentDetailsService.getUserPaymentDetails(user);
        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }
}
