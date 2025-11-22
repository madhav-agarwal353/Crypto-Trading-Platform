package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Coin;
import com.stockmarket.predictor.Model.Watchlist;
import com.stockmarket.predictor.Respository.WatchListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchlistServiceImpl implements WatchListService {

    @Autowired
    private WatchListRepository watchListRepository;

    @Override
    public Watchlist getWatchlistByUserId(String userId) throws Exception {
        Watchlist watchlist = watchListRepository.findByUserId(userId);
        if (watchlist == null) {
            throw new Exception("Watchlist not found for userId: " + userId);
        } else {
            return watchlist;
        }
    }

    @Override
    public Watchlist createWatchlist(User user) throws Exception {
        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);
        return watchListRepository.save(watchlist);
    }

    @Override
    public Coin addStockToWatchlist(Coin coin, User user) throws Exception {
        Watchlist optionalWatchlist =
                watchListRepository.findByUserId(user.getId());
        if (optionalWatchlist == null) {
               optionalWatchlist = createWatchlist(user);
        }
            Watchlist watchlist = optionalWatchlist;
            watchlist.getCoins().add(coin);
            watchListRepository.save(watchlist);
            return coin;
    }

    @Override
    public Coin removeStockFromWatchlist(Coin coin, User user) throws Exception {
        return null;
    }

    @Override
    public Watchlist findById(String id) throws Exception {
        Watchlist optionalWatchlist =
                watchListRepository.findByUserId(id);
        if (optionalWatchlist == null) {
            throw new Exception("Watchlist not found for userId: " + user.getId());
        } else {
           return optionalWatchlist;
        }
    }
}
