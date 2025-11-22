package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.Coin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CoinRespository extends MongoRepository<Coin, String> {
}
