package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Wallet;
import com.stockmarket.predictor.Model.Withdrawal;
import com.stockmarket.predictor.Service.UserService;
import com.stockmarket.predictor.Service.WalletService;
import com.stockmarket.predictor.Service.WithdrawalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("api//withdrawals")
public class WithdrawalController {

    @Autowired
    private WithdrawalService withdrawalService;
    @Autowired
    private WalletService walletService;
    @Autowired
    private UserService userService;

    @GetMapping("/request/{amount}")
    public ResponseEntity<?> withdrawalRequest(
            @PathVariable Double amount,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Wallet wallet = walletService.getUserWallet(user);
        if (wallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            return ResponseEntity.badRequest().body("Insufficient balance for withdrawal");
        } else {
            Withdrawal withdrawal = withdrawalService.requestWithdrawal(user, amount);
            walletService.addBalance(wallet, -withdrawal.getAmount());

            return ResponseEntity.ok("Withdrawal request submitted successfully");
        }
    }

    @PatchMapping("/process/{withdrawalId}/{isSuccess}")
    public ResponseEntity<?> processWithdrawal(
            @PathVariable String withdrawalId,
            @PathVariable boolean isSuccess,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Withdrawal withdrawal = withdrawalService.processWithdrawal(withdrawalId, isSuccess);
        Wallet wallet = walletService.getUserWallet(user);
        if (!isSuccess) {
            walletService.addBalance(wallet, withdrawal.getAmount());
            return ResponseEntity.ok("Withdrawal failed. Amount refunded to wallet.");
        } else {
            return ResponseEntity.ok("Withdrawal processed successfully.");
        }
    }

    @GetMapping("/withdrawal")
    public ResponseEntity<?> getAllWithdrawalsOfUser(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        List<?> withdrawals = withdrawalService.getAllWithdrawalsOfUser(user.getId());
        return ResponseEntity.ok(withdrawals);
    }

    @GetMapping("/all-requests")
    public ResponseEntity<?> getAllWithdrawalRequests(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        if (!user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }
        List<?> withdrawals = withdrawalService.getAllWithdrawalRequest();
        return ResponseEntity.ok(withdrawals);
    }
}