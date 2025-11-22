package com.stockmarket.predictor.Service;

import com.razorpay.RazorpayException;
import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.PaymentOrder;
import com.stockmarket.predictor.Response.PaymentResponse;
import com.stockmarket.predictor.domain.PaymentMethod;
import com.stripe.exception.StripeException;

public interface PaymentService {
    PaymentOrder createOrder(User user, Double amount,
                             PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(String id) throws Exception;

    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder
            , String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPayment(User user, Double amount) throws RazorpayException;

    PaymentResponse createStripePayment(User user, Double amount, String orderId) throws StripeException;

}
