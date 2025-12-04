package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Coin;
import com.stockmarket.predictor.Model.Wallet;
import com.stockmarket.predictor.Model.Watchlist;
import com.stockmarket.predictor.Service.CoinService;
import com.stockmarket.predictor.Service.UserService;
import com.stockmarket.predictor.Service.WatchListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/watchlist")
public class WatchListController {

    @Autowired
    private WatchListService watchListService;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    public ResponseEntity<?> getUserWatchlist(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return ResponseEntity.ok(watchListService.getWatchlistByUserId(user.getId()));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createWatchlist(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Watchlist watchlist = watchListService.createWatchlist(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(watchlist);
    }

    @GetMapping("/id/{watchListId}")
    public ResponseEntity<?> getWatchListById(
            @PathVariable String WatchListId
    ) throws Exception {
        return ResponseEntity.ok(watchListService.findById(WatchListId));
    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<?> addCoin(
            @RequestHeader("Authorization") String token,
            @PathVariable String coinId
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Coin coin = coinService.findById(coinId);
        Coin addedcoin = watchListService.addStockToWatchlist(coin, user);
        return ResponseEntity.ok(addedcoin);
    }
}
