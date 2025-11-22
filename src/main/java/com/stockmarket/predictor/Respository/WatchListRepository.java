package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.Watchlist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WatchListRepository extends MongoRepository<Watchlist,String> {
    Watchlist findByUserId(String userId);
}
