package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.Withdrawal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WithdrawalRepository extends MongoRepository<Withdrawal,String> {
    List<Withdrawal> findByUserId(String userId);

}
