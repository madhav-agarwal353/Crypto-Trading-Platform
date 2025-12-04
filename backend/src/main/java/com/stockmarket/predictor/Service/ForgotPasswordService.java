package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.ForgotPasswordToken;
import com.stockmarket.predictor.domain.VerificationType;

public interface ForgotPasswordService {
    ForgotPasswordToken createToken
            (User user,
             String token,
             String id, VerificationType verificationType,
             String sendTo);
    ForgotPasswordToken findByUserId(String userId);
    void deleteToken(ForgotPasswordToken token);
    ForgotPasswordToken findByUser(String userId);
}
