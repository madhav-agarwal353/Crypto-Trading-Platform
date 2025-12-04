package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.TwoFactorOtp;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TwoFactorOtpRespository extends MongoRepository<TwoFactorOtp, String> {
    TwoFactorOtp findByUserId(String userId);
}
