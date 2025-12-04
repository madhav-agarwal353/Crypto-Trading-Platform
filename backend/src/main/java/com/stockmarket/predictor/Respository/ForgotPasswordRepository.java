package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.ForgotPasswordToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ForgotPasswordRepository extends MongoRepository<ForgotPasswordToken, String> {
    ForgotPasswordToken findByUserId(String userId);
}
