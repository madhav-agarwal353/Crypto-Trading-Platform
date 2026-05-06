package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.WalletTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WalletTransactionRespository extends MongoRepository<WalletTransaction, String> {

    List<WalletTransaction> findByUserIdOrderByCreatedAtDesc(String userId);

}
