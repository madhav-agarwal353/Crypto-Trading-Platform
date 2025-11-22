package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Order;
import com.stockmarket.predictor.Model.PaymentOrder;
import com.stockmarket.predictor.Model.Wallet;
import com.stockmarket.predictor.Model.WalletTransaction;
import com.stockmarket.predictor.Response.PaymentResponse;
import com.stockmarket.predictor.Service.OrderService;
import com.stockmarket.predictor.Service.PaymentService;
import com.stockmarket.predictor.Service.UserService;
import com.stockmarket.predictor.Service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {

    @Autowired
    private WalletService walletService;
    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/user")
    public ResponseEntity<?> getWalletByUserId(String userId) {
        User user = userService.findUserById(userId);
        Wallet wallet = walletService.getUserWallet(user);
        if (wallet != null) {
            return ResponseEntity.ok(wallet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/wallet")
    public ResponseEntity<?> getUserWallet(@RequestHeader("Authorization") String jwt) {
        User user = userService.findUserByJwtToken(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        return ResponseEntity.ok(wallet);
    }

    @PutMapping("/wallet/${walletId}/transfer")
    public ResponseEntity<?> walletToWalletTransfer(
            @RequestHeader("Authorization") String jwt
            , @PathVariable String walletId
            , @RequestBody WalletTransaction walletTransaction) throws Exception {
        User senderUser = userService.findUserByJwtToken(jwt);
        Wallet senderWallet = walletService.getUserWallet(senderUser);
        Wallet recieverWallet = walletService.findWalletById(walletId);
        walletService.transferFunds(senderWallet, recieverWallet, walletTransaction.getAmount());
        return new ResponseEntity<>("successful", HttpStatus.OK);
    }

    @PutMapping("/wallet/order/{orderId}/pay")
    public ResponseEntity<?> payOrder(
            @RequestHeader("Authorization") String jwt
            , @PathVariable String orderId) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.getOrderById(orderId);
        Wallet wallet = walletService.payOrder(order, user);
        return new ResponseEntity<>("successful", HttpStatus.OK);
    }

    @PutMapping("/wallet/order/{orderId}/pay")
    public ResponseEntity<?> addMoneyToWallet(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(name = "order_id") String orderId,
            @RequestParam(name = "payment_id") String paymentId
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        PaymentOrder order = paymentService.getPaymentOrderById(orderId);
        Boolean status = paymentService.ProceedPaymentOrder(order, paymentId);
        if (status) {
            walletService.addBalance(wallet, order.getAmount());
        }


        return new ResponseEntity<>("successful", HttpStatus.OK);
    }
}
