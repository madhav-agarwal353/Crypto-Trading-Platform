package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Response.NewsResponse;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
public class NewsServiceImpl implements com.stockmarket.predictor.Service.NewsService {

    private static final String CACHE_NAME = "cryptoNews";
    private static final String CACHE_KEY = "latest";

    private static final String NEWS_URL =
            "https://newsdata.io/api/1/latest?apikey=pub_4b7f31f22cee46f7b1645ab45514c326&q=crypto&language=en";

    private final RestTemplate restTemplate;
    private final CacheManager cacheManager;

    public NewsServiceImpl(RestTemplate restTemplate, CacheManager cacheManager) {
        this.restTemplate = restTemplate;
        this.cacheManager = cacheManager;
    }

    @Override
    public NewsResponse getLatestCryptoNews() {

        try {
            // Fetch live news
            NewsResponse response =
                    restTemplate.getForObject(NEWS_URL, NewsResponse.class);

            // Save to cache
            cacheManager.getCache(CACHE_NAME)
                    .put(CACHE_KEY, response);

            return response;

        } catch (Exception e) {

            // Fallback to cache
            Cache.ValueWrapper cached =
                    cacheManager.getCache(CACHE_NAME).get(CACHE_KEY);

            if (cached != null) {
                return (NewsResponse) cached.get();
            }

            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "News service unavailable"
            );
        }
    }
}
