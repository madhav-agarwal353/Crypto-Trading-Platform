package com.stockmarket.predictor.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stockmarket.predictor.Service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coins")
public class CoinController {
    @Autowired
    private CoinService coinService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    ResponseEntity<?> getCoinList(@RequestParam("page") int page) {
        return ResponseEntity.ok(coinService.getCoinList(page));
    }

    @GetMapping("/{coinId}/market-chart")
    ResponseEntity<?> getMarketChart(@PathVariable String coinId,
                                     @RequestParam("days") int days) throws Exception {
        String chart = coinService.getMarketChart(coinId, days);
        Object json = objectMapper.readTree(chart);
        return ResponseEntity.ok(json);
    }

    @GetMapping("/{coinId}/details")
    ResponseEntity<?> getCoinDetails(@PathVariable String coinId) throws Exception {
        String details = coinService.getCoinDetails(coinId);
        Object json = objectMapper.readTree(details);
        return ResponseEntity.ok(json);
    }

    @GetMapping("/search")
    ResponseEntity<?> searchCoins(@RequestParam("keyword") String keyword) throws Exception {
        String result = coinService.searchCoins(keyword);
        Object json = objectMapper.readTree(result);
        return ResponseEntity.ok(json);
    }

    @GetMapping("/top50")
    ResponseEntity<?> getTop50Coins() throws Exception {
        String result = coinService.getTop50Coins();
        Object json = objectMapper.readTree(result);
        return ResponseEntity.ok(json);
    }
    @GetMapping("/trending")
    ResponseEntity<?> getTrendingCoins() throws Exception {
        String result = coinService.getTrendingCoins();
        Object json = objectMapper.readTree(result);
        return ResponseEntity.ok(json);
    }
    
}
