package com.stockmarket.predictor.Service;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.PaymentOrder;
import com.stockmarket.predictor.Response.PaymentResponse;
import com.stockmarket.predictor.Respository.PaymentOrderRepository;
import com.stockmarket.predictor.domain.PaymentMethod;
import com.stockmarket.predictor.domain.PaymentOrderStatus;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import netscape.javascript.JSObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Value("${stripe.api.key}")
    private String stripeKey;

    @Value("${razorpay.api.key}")
    private String razorpayKey;

    @Value("${razorpay.api.secretkey}")
    private String razorpaysecretKey;


    @Override
    public PaymentOrder createOrder(User user,
                                    Double amount,
                                    PaymentMethod paymentMethod) {
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setAmount(amount);
        paymentOrder.setAmount(amount);
        paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        paymentOrder.setUser(user);
        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(String id) throws Exception {
        Optional<PaymentOrder> paymentOrder = paymentOrderRepository.findById(id);
        if (paymentOrder.isPresent())
            return paymentOrder.get();
        throw new Exception("No payment Order found");
    }

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException {
        if (paymentOrder.getStatus() == null) {
            paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        }
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
                RazorpayClient razorpayClient = new RazorpayClient(razorpayKey, razorpaysecretKey);
                Payment payment = razorpayClient.payments.fetch(paymentId);
                Integer amount = payment.get("amount");
                String status = payment.get("status");
                if (status.equals("captured")) {
                    paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                    paymentOrderRepository.save(paymentOrder);
                    return true;
                }
                paymentOrder.setStatus(PaymentOrderStatus.FAILED);
                paymentOrderRepository.save(paymentOrder);
                return false;
            }
            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
            paymentOrderRepository.save(paymentOrder);
            return true;
        }
        return false;
    }

    @Override
    public PaymentResponse createRazorpayPayment(User user, Double amount, String orderId) throws RazorpayException {
        try {
            amount *= 100;
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKey, razorpaysecretKey);
            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", user.getName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);
            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);
            paymentLinkRequest.put("reminder_enable", true);
            paymentLinkRequest.put(
                    "callback_url", "http://localhost:8080/api/wallets/wallet?order_id=" + orderId);
            paymentLinkRequest.put("callback_method", "get");
            PaymentLink payment = razorpayClient.paymentLink.create(
                    paymentLinkRequest);
            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("short_url");

            PaymentResponse res = new PaymentResponse();
            res.setPayment_url(paymentLinkUrl);
            return res;
        } catch (RazorpayException e) {
            System.out.println(e.getMessage());
            throw new RazorpayException(e.getMessage());
        }
    }

    @Override
    public PaymentResponse createStripePayment(User user, Double amount, String orderId) throws StripeException {
        Stripe.apiKey = stripeKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:8080/wallet?order_id=" + orderId)
                .setCancelUrl("http://localhost:8080/payment/cancel")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount(amount.longValue() * 100)
                                                .setProductData(
                                                        SessionCreateParams.LineItem
                                                                .PriceData.ProductData
                                                                .builder()
                                                                .setName("Top up wallet")
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                )
                .build();
        Session session = Session.create(params);
        System.out.println(
                "session _____" + session
        );
        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(session.getUrl());
        return res;
    }
}
