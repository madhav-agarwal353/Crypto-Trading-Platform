package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Model.Coin;

import java.util.List;

public interface CoinService {
    List<Coin> getCoinList(int page);

    String getMarketChart(String coinId, int days);

    String getCoinDetails(String coinId);

    Coin findById(String coinId);

    String searchCoins(String keyword);

    String getTop50Coins();

    String getTrendingCoins();
}
