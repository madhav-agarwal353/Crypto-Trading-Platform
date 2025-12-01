package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.PaymentOrder;
import com.stockmarket.predictor.Response.PaymentResponse;
import com.stockmarket.predictor.Service.PaymentService;
import com.stockmarket.predictor.Service.UserService;
import com.stockmarket.predictor.domain.PaymentMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {
    @Autowired
    private UserService userService;
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<?> paymentHeader(
            @PathVariable PaymentMethod paymentMethod,
            @PathVariable Double amount,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        PaymentResponse paymentResponse;
        PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);
        if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
            paymentResponse = paymentService.createRazorpayPayment(user, amount, order.getId());
        } else {
            paymentResponse = paymentService.createStripePayment(user, amount, order.getId());
        }
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }

}
