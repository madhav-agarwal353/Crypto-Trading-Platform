package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.VerificationCode;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VerificationCodeRespository extends MongoRepository<VerificationCode , String> {
    public VerificationCode findByUserId(String userId);



}
