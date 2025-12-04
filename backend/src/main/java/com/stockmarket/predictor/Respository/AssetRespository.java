package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.Asset;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AssetRespository extends MongoRepository<Asset, String> {
    List<Asset> findByUserId(String username);
    Asset findByUserIdAndCoinId(String userId, String coinId);
}
