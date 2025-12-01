package com.stockmarket.predictor.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stockmarket.predictor.Model.Coin;
import com.stockmarket.predictor.Respository.CoinRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CoinServiceImpl implements CoinService {

    @Autowired
    private CoinRespository coinRespository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public List<Coin> getCoinList(int page) {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=" + page;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );
        try {
            List<Coin> coinList = objectMapper.readValue(response.getBody(), new TypeReference<List<Coin>>() {
            });
            return coinList;
        } catch (JsonMappingException e) {
            System.err.println("Mapping error: " + e.getMessage());
        } catch (JsonProcessingException e) {
            System.err.println("Invalid JSON: " + e.getMessage());
        }
        return null;
    }

    @Override
    public String getMarketChart(String coinId, int days) {
        try {
            String url = "https://api.coingecko.com/api/v3/coins/" + coinId + "/market_chart?vs_currency=usd&days=" + days;
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public String getCoinDetails(String coinId) {
        try {
            String url = "https://api.coingecko.com/api/v3/coins/" + coinId;
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );
            JsonNode root = objectMapper.readTree(response.getBody());
            Coin coin = new Coin();
            coin.setId(root.path("id").asText());
            coin.setName(root.path("name").asText());
            coin.setSymbol(root.path("symbol").asText());
            coin.setImage(root.path("image").path("large").asText());
            JsonNode marketData = root.path("market_data");

            coin.setCurrentPrice(marketData.path("current_price").path("usd").decimalValue());
            coin.setMarketCap(marketData.path("market_cap").path("usd").decimalValue());
            coin.setMarketCapRank(marketData.path("market_cap_rank").asInt());
            coin.setFullyDilutedValuation(marketData.path("fully_diluted_valuation").path("usd").decimalValue());
            coin.setTotalVolume(marketData.path("total_volume").path("usd").decimalValue());
            coin.setHigh24h(marketData.path("high_24h").path("usd").decimalValue());
            coin.setLow24h(marketData.path("low_24h").path("usd").decimalValue());
            coin.setPriceChange24h(marketData.path("price_change_24h").decimalValue());
            coin.setPriceChangePercentage24h(marketData.path("price_change_percentage_24h").decimalValue());
            coin.setMarketCapChange24h(marketData.path("market_cap_change_24h").decimalValue());
            coin.setMarketCapChangePercentage24h(marketData.path("market_cap_change_percentage_24h").decimalValue());
            coin.setCirculatingSupply(marketData.path("circulating_supply").decimalValue());
            coin.setTotalSupply(marketData.path("total_supply").decimalValue());
            coin.setMaxSupply(marketData.path("max_supply").decimalValue());
            coin.setAth(marketData.path("ath").path("usd").decimalValue());
            coin.setAthChangePercentage(marketData.path("ath_change_percentage").path("usd").decimalValue());
            coin.setAthDate(Instant.parse(marketData.path("ath_date").path("usd").asText())
            );
            coin.setAtl(marketData.path("atl").path("usd").decimalValue());
            coin.setAtlChangePercentage(marketData.path("atl_change_percentage").path("usd").decimalValue());
            coin.setAtlDate(Instant.parse(marketData.path("atl_date").path("usd").asText()));
            coin.setLastUpdated(marketData.path("last_updated").asText());
            coinRespository.save(coin);
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new RuntimeException(e.getMessage());
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Coin findById(String coinId) {
        Optional<Coin> coin = coinRespository.findById(coinId);
        if (coin.isEmpty()) {
            throw new RuntimeException("Coin not found");
        }
        return coin.get();
    }

    @Override
    public String searchCoins(String keyword) {
        try {
            String url = "https://api.coingecko.com/api/v3/search?query=" + keyword;
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public String getTop50Coins() {
        try {
            String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public String getTrendingCoins() {
        try {
            String url = "https://api.coingecko.com/api/v3/search/trending";
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }
}
