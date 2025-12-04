package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WalletRespository extends MongoRepository<Wallet, String> {
    Wallet findByUserId(String userId);
}
