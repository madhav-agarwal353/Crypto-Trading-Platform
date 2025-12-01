package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.VerificationCode;
import com.stockmarket.predictor.Service.EmailService;
import com.stockmarket.predictor.Service.UserService;
import com.stockmarket.predictor.Service.VerificationCodeService;
import com.stockmarket.predictor.domain.VerificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private VerificationCodeService verificationCodeService;

    @GetMapping("/users/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
        System.out.println("hi");
        User user = userService.findUserByJwtToken(token);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/users/verification/{verificationType}/sendotp")
    public ResponseEntity<?> sendVerificationOtp(
            @RequestHeader("Authorization") String token,
            @PathVariable VerificationType verificationType) {
        User user = userService.findUserByJwtToken(token);
        VerificationCode vc = verificationCodeService
                .getVerificationCodeByUser(user.getId());
        if (vc == null) {
            vc = verificationCodeService
                    .sendVerificationCode(user, verificationType);
        }
        if (verificationType.equals(VerificationType.EMAIL)) {
            emailService.sendVerificationEmail(user.getEmail(), vc.getOtp());
        }

        return new ResponseEntity<>("Otp send successfully", HttpStatus.OK);
    }

    @PatchMapping("/users/enable-2fa/verify-otp/{otp}")
    public ResponseEntity<?> enableTwoFactorAuth(@RequestHeader("Authorization") String token
            , @PathVariable String otp) {
        User user = userService.findUserByJwtToken(token);
        VerificationCode vc = verificationCodeService
                .getVerificationCodeByUser(user.getId());
        String sendTo = vc.getVerificationType().equals(VerificationType.EMAIL) ? vc.getEmail() : vc.getMobile();
        boolean isVerified = vc.getOtp().equals(otp);
        if (isVerified) {
            User updatedUser = userService
                    .enableTwoFactorAuth(vc.getVerificationType(), sendTo, user);
            verificationCodeService.deleteVerificationCode(vc);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>("Wrong otp", HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/auth/users/reset-password/sendotp")
    public ResponseEntity<?> sendForgotPasswordOtp(
            @RequestHeader("Authorization") String token,
            @PathVariable VerificationType verificationType) {
        User user = userService.findUserByJwtToken(token);
        VerificationCode vc = verificationCodeService
                .getVerificationCodeByUser(user.getId());
        if (vc == null) {
            vc = verificationCodeService
                    .sendVerificationCode(user, verificationType);
        }
        if (verificationType.equals(VerificationType.EMAIL)) {
            emailService.sendVerificationEmail(user.getEmail(), vc.getOtp());
        }
        return new ResponseEntity<>("Otp send successfully", HttpStatus.OK);
    }


}
