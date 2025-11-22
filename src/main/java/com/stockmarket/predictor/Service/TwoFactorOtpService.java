package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.TwoFactorOtp;

public interface TwoFactorOtpService {
    TwoFactorOtp createTwoFactorOtp(User user, String Otp, String token);

    TwoFactorOtp findByUser(String userId);

    TwoFactorOtp findById(String id);

    boolean verifyOtp(TwoFactorOtp twoFactorOtp, String otp);

   void deleteOtp(TwoFactorOtp twoFactorOtp);
}
