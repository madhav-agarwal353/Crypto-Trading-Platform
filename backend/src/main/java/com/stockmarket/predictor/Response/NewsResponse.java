package com.stockmarket.predictor.Response;

import com.stockmarket.predictor.Model.Article;
import lombok.Data;

import java.util.List;

@Data
public class NewsResponse {
    private String status;
    private int totalResults;
    private List<Article> results;
}
