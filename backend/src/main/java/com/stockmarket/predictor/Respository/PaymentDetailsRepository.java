package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.PaymentDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentDetailsRepository  extends MongoRepository<PaymentDetails , String> {
    PaymentDetails findByUserId(String userId);

}
