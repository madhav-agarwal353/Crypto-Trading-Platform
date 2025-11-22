package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Coin;
import com.stockmarket.predictor.Model.Watchlist;

public interface WatchListService {

    Watchlist getWatchlistByUserId(String userId) throws Exception;

    Watchlist createWatchlist(User user) throws Exception;

    Coin addStockToWatchlist(Coin coin, User user) throws Exception;

    Coin removeStockFromWatchlist(Coin coin, User user) throws Exception;

    Watchlist findById(String id)throws Exception;
}
