package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Service.NewsService;
import com.stockmarket.predictor.Response.NewsResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/crypto")
    public NewsResponse getCryptoNews() {
        return newsService.getLatestCryptoNews();
    }
}
