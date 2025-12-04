package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.PaymentOrder;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PaymentOrderRepository extends MongoRepository<PaymentOrder, String> {
   Optional<PaymentOrder> findById(String id);
}
